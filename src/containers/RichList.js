import React from "react";
import Container from "react-bootstrap/Container";
import {connect} from "react-redux";
import ExpensiveItemContainer from "./ExpensiveItemContainer";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import "../styles/RichList.scss";
import Form from "react-bootstrap/Form";
import ListGroup from "react-bootstrap/ListGroup";
import {bindActionCreators} from "redux";
import {changeCurrency, toggleSeveralYears, setSeveralYearsValue, changePriceTextForm, toggleForceCustomisable} from "../actions/settingsActions";
import ToggleButtonGroup from 'react-bootstrap/ToggleButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {createNewItem} from "../actions/itemActions";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

class RichList extends React.Component {
	constructor(props) {
		super(props);
		this.getTotalPrice = this.getTotalPrice.bind(this);
		this.getYearlyPrice = this.getYearlyPrice.bind(this);
		this.changeOneshotOpen = this.changeOneshotOpen.bind(this);
		this.changeOptionsShow = this.changeOptionsShow.bind(this);
		this.setSeveralYearsValue = this.setSeveralYearsValue.bind(this);
		this.getSeveralYearsPrice = this.getSeveralYearsPrice.bind(this);
		this.toggleReceiptShow = this.toggleReceiptShow.bind(this);
		this.changeCurrency = this.changeCurrency.bind(this);
		this.convertCurrency = this.convertCurrency.bind(this);
		this.changeTextForm = this.changeTextForm.bind(this);
		this.createItem = this.createItem.bind(this);
		this.state = {
			oneshot_open: true,
			advanced_options: false,
			show_receipt: false
		};
	}

	getTotalPrice() {
		let total_price = 0;
		for(let i = 0; i < this.props.items.length; i++) {
			if(this.props.items[i].type === "oneshot") {
				total_price += this.props.items[i].quantity * this.props.items[i].price;
			}
		}
		total_price = this.convertCurrency(total_price);
		return Math.round(total_price);
		
	}

	getYearlyPrice() {
		let total_yearly_price = 0;
		for(let i = 0; i < this.props.items.length; i++) {
			if(this.props.items[i].type !== "oneshot") {
				let str = this.props.items[i].type;
				if(str.substring(str.length - 3) !== "ing" || str === "yearly-recurring") {
					total_yearly_price += this.props.items[i].price * this.props.items[i].quantity;
				}
				else if(str === "daily-recurring") {
					total_yearly_price += this.props.items[i].price * this.props.items[i].quantity * 365;
				}
				else if(str === "weekly-recurring") {
					total_yearly_price += this.props.items[i].price * this.props.items[i].quantity * 52;
				}
				else {
					total_yearly_price += this.props.items[i].price * this.props.items[i].quantity * 12;
				}
			}
		}
		total_yearly_price = this.convertCurrency(total_yearly_price);
		return Math.round(total_yearly_price);
	}

	changeOneshotOpen() {
		this.setState((state) => ({oneshot_open: !state.oneshot_open}));
	}

	changeOptionsShow() {
		this.setState((state) => ({advanced_options: !state.advanced_options}));
	}

	setSeveralYearsValue() {
		if(document.getElementById("several-years-input").value < 0) {
			this.props.setSeveralYearsValue(0);
		}
		else {
			this.props.setSeveralYearsValue(document.getElementById("several-years-input").value);
		}
	}

	getSeveralYearsPrice() {
		let yearlyPriceNum = parseInt(this.getYearlyPrice());
		let severalPrice = yearlyPriceNum * this.props.several_years_value;
		return severalPrice;
	}

	toggleReceiptShow() {
		this.setState((state) => ({show_receipt: !state.show_receipt}));
	}

	changeCurrency() {
		this.props.changeCurrency(document.getElementById("currency-select").value);
	}

	priceToText(price) {
		let price_text = "";
		if(this.props.price_text_form === "words") {
			if(price >= 1000000000000) {
				price_text += price / 1000000000000;
				while((price_text.toString().length - price_text.toString().indexOf(".") - 1 > 2 || price_text[price_text.length - 1] === "0" || price_text[price_text.length - 1] === ".") && price_text.includes(".")) {
					price_text = price_text.substring(0, price_text.length - 1);
				}
				price_text += " trillion";
				// price_text += (price / 1000000000000) + " trillion";
			}
			else if(price >= 1000000000) {
				price_text += price / 1000000000;
				while((price_text.toString().length - price_text.toString().indexOf(".") - 1 > 2 || price_text[price_text.length - 1] === "0" || price_text[price_text.length - 1] === ".") && price_text.includes(".")) {
					price_text = price_text.substring(0, price_text.length - 1);
				}
				price_text += " billion";
				// price_text += (price / 1000000000) + " billion";
			}
			else if(price >= 1000000) {
				price_text += price / 1000000;
				while((price_text.toString().length - price_text.toString().indexOf(".") - 1 > 2 || price_text[price_text.length - 1] === "0" || price_text[price_text.length - 1] === ".") && price_text.includes(".")) {
					price_text = price_text.substring(0, price_text.length - 1);
				}
				price_text += " million";
				// if((price / 1000000).toString().length - (price / 1000000).toString().indexOf(".") - 1 > 2) {
				// 	price_text += (price / 1000000).toString().substring(0, (price / 1000000).toString().length - ((price / 1000000).toString().length - (price / 1000000).toString().indexOf(".") - 1) + 2);
				// 	if(price_text[price_text.length - 1] === "0") {
				// 		price_text = price_text.substring(0, price_text.length - 1);
				// 	}
				// 	price_text += " million";
				// }
				// else {
				// 	price_text += (price / 1000000) + " million";
				// }
			}
			else if(price >= 1000) {
				price_text += Math.floor(price / 1000) + ",";
				if(price.toString().length !== (price_text.length - 2)) {
					let remainder = price % 1000;
					if(remainder >= 100) {
						
					}
					else if(remainder >= 10) {
						price_text += "0";
					}
					else {
						price_text += "00";
					}
				}
				price_text += (price % 1000);
			}
			else {
				price_text += price;
			}
		}
		else {
			if(price >= 1000000000000) {
				price_text += Math.floor(price / 1000000000000) + ",";
				let next_bit = Math.floor((price % 1000000000000) / 1000000000);
				if(next_bit < 10) {
					price_text += "00" + next_bit + ",";
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit + ",";
				}
				else {
					price_text += next_bit + ",";
				}
				next_bit = Math.floor((price % 1000000000) / 1000000);
				if(next_bit < 10) {
					price_text += "00" + next_bit + ",";
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit + ",";
				}
				else {
					price_text += next_bit + ",";
				}
				next_bit = Math.floor((price % 1000000) / 1000);
				if(next_bit < 10) {
					price_text += "00" + next_bit + ",";
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit + ",";
				}
				else {
					price_text += next_bit + ",";
				}
				next_bit = Math.floor((price % 1000) / 1);
				if(next_bit < 10) {
					price_text += "00" + next_bit;
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit;
				}
				else {
					price_text += next_bit;
				}
			}
			else if(price >= 1000000000) {
				price_text += Math.floor(price / 1000000000) + ",";
				let next_bit = Math.floor((price % 1000000000) / 1000000);
				if(next_bit < 10) {
					price_text += "00" + next_bit + ",";
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit + ",";
				}
				else {
					price_text += next_bit + ",";
				}
				next_bit = Math.floor((price % 1000000) / 1000);
				if(next_bit < 10) {
					price_text += "00" + next_bit + ",";
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit + ",";
				}
				else {
					price_text += next_bit + ",";
				}
				next_bit = Math.floor((price % 1000) / 1);
				if(next_bit < 10) {
					price_text += "00" + next_bit;
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit;
				}
				else {
					price_text += next_bit;
				}
			}
			else if(price >= 1000000) {
				price_text += Math.floor(price / 1000000) + ",";
				let next_bit = Math.floor((price % 1000000) / 1000);
				if(next_bit < 10) {
					price_text += "00" + next_bit + ",";
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit + ",";
				}
				else {
					price_text += next_bit + ",";
				}
				next_bit = Math.floor((price % 1000) / 1);
				if(next_bit < 10) {
					price_text += "00" + next_bit;
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit;
				}
				else {
					price_text += next_bit;
				}
			}
			else if(price >= 1000) {
				price_text += Math.floor(price / 1000) + ",";
				let next_bit = Math.floor((price % 1000) / 1);
				if(next_bit < 10) {
					price_text += "00" + next_bit;
				}
				else if(next_bit < 100) {
					price_text += "0" + next_bit;
				}
				else {
					price_text += next_bit;
				}
			}
			else {
				price_text += price;
			}
		}
		return price_text;
	}

	convertCurrency(price) {
		let new_price = price;
		if(this.props.currency === "€") {
			new_price *= 1.12;
		}
		else if(this.props.currency === "$") {
			new_price *= 1.33;
		}
		return new_price;
	}

	getReceiptQuantityText(item) {
		switch(item.type) {
			case "oneshot":
				return "x" + item.quantity;
				break;
			case "weekly":
				return item.quantity + " weeks a year";
				break;
			case "monthly":
				return item.quantity + " months a year";
				break;
			case "yearly":
				return item.quantity + "a year";
				break;
			case "daily-recurring":
				return item.quantity === 1 ? item.quantity + " time a day" : item.quantity + " times a day";
				break;
			case "weekly-recurring":
				return item.quantity === 1 ? item.quantity + " time a week" : item.quantity + " times a week";
				break;
			case "monthly-recurring":
				return item.quantity === 1 ? item.quantity + " time a month" : item.quantity + " times a month";
				break;
			case "yearly-recurring":
				return item.quantity === 1 ? item.quantity + " time a year" : item.quantity + " times a year";
				break;
		}
	}

	changeTextForm() {
		if(document.getElementById("words-option").childNodes[0].checked) {
			this.props.changePriceTextForm("words");
		}
		else {
			this.props.changePriceTextForm("commas");
		}
		// this.props.changePriceTextForm(document.getElementById("word-form").value);
	}

	createItem(e) {
		e.preventDefault();
		if(document.getElementById("name-input").value === "" || document.getElementById("description-input").value === "" || document.getElementById("price-input").value === "") {
			return;
		}
		let link = document.getElementById("link-input").value;
		if(document.getElementById("link-input").value === "") {
			link = undefined;
		}
		if(document.getElementById("type-input").value === "customisable") {
			this.props.createNewItem(document.getElementById("name-input").value, document.getElementById("price-input").value, "oneshot", link, true, document.getElementById("description-input").value);
		}
		else {
			this.props.createNewItem(document.getElementById("name-input").value, document.getElementById("price-input").value, document.getElementById("type-input").value, link, false, document.getElementById("description-input").value);
		}
	}

	render() {
		return (
			<div id="RichList">
				<Container>
					<Card id="price-box" className="mx-auto p-4 mt-3">
						<h2 id="totalPrice">One-time price: {this.props.currency}{this.priceToText(this.getTotalPrice())}</h2>
						<h2 id="yearlyPrice">Yearly price: {this.props.currency}{this.priceToText(this.getYearlyPrice())}</h2>
						{this.props.several_years_setting && <h2 id="severalYearsPrice">Price over {this.props.several_years_value === "" ? 0 : this.props.several_years_value} {this.props.several_years_value !== 1 ? "years" : "year"}: {this.props.currency}{this.priceToText(this.getSeveralYearsPrice())}</h2>}
						<Button variant="link" onClick={this.changeOptionsShow} id="advanced-options-button" className="p-0 link-button">Advanced options</Button>
						<Collapse in={this.state.advanced_options}>
							<div id="advanced-options">
								<Form>
									<Form.Group>
										<Form.Check type="checkbox" label="Show cost over several years" onChange={this.props.toggleSeveralYears} id="several-years-toggle" />
										{this.props.several_years_setting && <><label htmlFor="several-years-input">Number of years:</label>{" "}<input type="number" value={this.props.several_years_value} onChange={this.setSeveralYearsValue} id="several-years-input" /></>}
									</Form.Group>
								</Form>
								<Form>
									<label htmlFor="currency-select">Currency:</label> {" "}
									<select onChange={this.changeCurrency} id="currency-select">
										<option value="£">GDP</option>
										<option value="€">EUR</option>
										<option value="$">USD</option>
									</select>
								</Form>
								<label htmlFor="word-form">Toggle price format:</label> {" "}
								<ToggleButtonGroup type="radio" name="text-form" defaultValue="words" onChange={this.changeTextForm} id="word-form">
									<ToggleButton value="words" id="words-option" className="py-1">Words</ToggleButton>
									<ToggleButton value="commas" id="commas-option" className="py-1">Commas</ToggleButton>
								</ToggleButtonGroup>
								<Form>
									<Form.Group className="my-2">
										<Form.Check type="checkbox" label="Force all items to have customisable periods" onChange={this.props.toggleForceCustomisable} id="force-toggle" />
									</Form.Group>
								</Form>
								<Button variant="link" onClick={this.toggleReceiptShow} id="receipt-toggle" className="p-0 link-button">{this.state.show_receipt ? "Hide receipt" : "Show receipt"}</Button>
								<Collapse in={this.state.show_receipt}>
									<ListGroup>
										{this.props.items.map(item => (<ListGroup.Item key={item.name}>{item.name} {this.getReceiptQuantityText(item)} {this.props.currency}{this.priceToText(Math.round(this.convertCurrency(item.price)))}</ListGroup.Item>))}
									</ListGroup>
								</Collapse>
							</div>
						</Collapse>
					</Card>
					{/* <Row> */}
						<Button variant="link" onClick={this.changeOneshotOpen} className="mt-3" block>Onetime</Button>
						{/* Collapse containing onetime items */}
						<Collapse in={this.state.oneshot_open}>
							<div id="oneshot-collapse">
								<ExpensiveItemContainer name="Woodlawn, Weybridge, Surrey" price={22490000} type="oneshot" link="https://www.knightfrank.co.uk/properties/residential/for-sale/east-road-st-george-s-hill-weybridge-surrey-kt13/CHO180110" customisable={this.props.force_customisable}>Within the internationally renowned St George's Hill private residential estate, Woodlawn is a stunning and iconic bespoke country home.</ExpensiveItemContainer>
								<ExpensiveItemContainer name="Boadicea (77m)" price={38398000} type="oneshot" link="https://www.fraseryachts.com/en/yacht-for-sale/boadicea/" customisable={this.props.force_customisable}>An Amels pedigree masterpiece, meticulously maintained and finished. Her interior boasts a private Owner’s deck including a master suite with terrace, large office and private saloon. She also features a guest elevator, spa with hydromassage, new beach club area and a very large sundeck with a pool which includes a touch-and-go helipad.</ExpensiveItemContainer>
								<ExpensiveItemContainer name="McLaren 720S" price={219500} type="oneshot" link="https://cars.mclaren.com/gb-en/super-series/720s" customisable={this.props.force_customisable}>The 720S embodies McLaren's relentless quest to push the limits of possibility. Lighter, stronger, faster. It’s all of these and more. But how it makes you feel is altogether something else. Prepare to push the limits of what you thought possible in a supercar.</ExpensiveItemContainer>
								<ExpensiveItemContainer name="2 bedroom flat in One Hyde Park" price={9950000} type="oneshot" link="https://search.savills.com/property-detail/gbsshsslh180407" customisable={this.props.force_customisable}>An immaculate and bright two bedroom apartment with wonderful park views, situated in one of London's premier residential buildings, One Hyde Park.</ExpensiveItemContainer>
								<ExpensiveItemContainer name="Cave Cay" price={47574000} type="oneshot" link="https://www.privateislandsonline.com/caribbean/bahamas/the-exumas/cave-cay" customisable={this.props.force_customisable}>Located in the heart of the Exumas and near to famed Musha Cay, Cave Cay is one of the most beautiful islands in the world and is totally self sufficient with water and power supplied by diesel generators. The island is available 'as is', and features unspoiled beaches, lush vegetation and elevations of up to 40 ft. capturing breathtaking views.</ExpensiveItemContainer>
								<ExpensiveItemContainer name="2011 Hawker 900XP" price={3001996} type="oneshot" link="https://www.jamesedition.com/jets/hawker/2011-hawker-900xp/2011-hawker-900xp-under-contract-10863230" customisable={this.props.force_customisable}>A luxury private jet available under contract.</ExpensiveItemContainer>
								<ExpensiveItemContainer name="Tiffany Soleste Ruby & Diamond Pendant" price={5275} type="oneshot" link="https://www.tiffany.co.uk/jewelry/necklaces-pendants/tiffany-soleste-pendant-60698996/" customisable={this.props.force_customisable}>Pendant in platinum with a ruby and a single row of round brilliant diamonds. 5 mm diameter. On a 16" chain. Round ruby, carat weight .40. Round brilliant diamonds, carat total weight .09.</ExpensiveItemContainer>
								<ExpensiveItemContainer name="Pearl and Diamond Earrings" price={7400} type="oneshot" link="https://www.tiffany.co.uk/jewelry/earrings/tiffany-victoria-pearl-and-diamond-earrings-31177162/" customisable={this.props.force_customisable}>Inspired by the fire and radiance of our superlative diamonds, Tiffany Victoria uses a unique combination of cuts for a distinctly romantic sensibility. South Sea cultured pearls elegantly complement the fiery radiance of platinum-set diamond earrings.</ExpensiveItemContainer>
								<ExpensiveItemContainer name="Heart Locket" price={2025} type="oneshot" link="https://www.tiffany.co.uk/jewelry/tiffany-charms/heart-locket-28554605/" customisable={this.props.force_customisable}>This Tiffany locket made with 1k gold will become your new favourite memento and cherished keepsake. It includes a Tiffany Blue® paper insert to be replaced with your personal memento or photograph.</ExpensiveItemContainer>
								<ExpensiveItemContainer name="Rolex Datejust 31" price={24100} type="oneshot" link="https://www.rolex.com/watches/datejust/m278278-0028.html" customisable={this.props.force_customisable}>This Oyster Perpetual Datejust 31 in 18 ct yellow gold features a silver, diamond-set dial and a President bracelet.</ExpensiveItemContainer>
							</div>
						</Collapse>
						<ExpensiveItemContainer name="Charter a Yacht (52m)" price={188171} type="weekly" link="https://www.fraseryachts.com/en/yacht-for-charter/latitude/">Displaying an art-deco transatlantic style, this yacht offers six double staterooms including an Owner stateroom with balconies, full beam sky lounge, glass-paneled elevator for all 4 decks and one of the most impressive sundecks ever conceived for this size of yacht.</ExpensiveItemContainer>
						<ExpensiveItemContainer name="Eton College Fees" price={42501} type="yearly" link="https://www.etoncollege.com/">Founded by King Henry VI in 1440, Eton has been one of the leading independent schools in the UK throughout its history, and it continues to provide a stimulating all-round education, coupled with academic excellence.</ExpensiveItemContainer>
						<ExpensiveItemContainer name="Wycombe Abbey Fees (Boarding)" price={40350} type="yearly" link="https://www.wycombeabbey.com/#intro">As the UK’s top girls’ boarding school Wycombe Abbey's students perform exceptionally across many different disciplines, achieving excellent results in public examinations. Their learning environment is supportive, yet challenging, with a sense that pupils and their teachers are on an educational journey together</ExpensiveItemContainer>
						<ExpensiveItemContainer name="Royal Two Bedroom Suite at the Burj Al Arab" price={8000} type="daily" link="https://www.jumeirah.com/en/stay/dubai/burj-al-arab-jumeirah">Take in the regal atmosphere created by classic Arabian decor and enjoy the comfort of cutting-edge technology, including a private lift and cinema room</ExpensiveItemContainer>
						<ExpensiveItemContainer name="A Ride on the Orient Express" price={2200} type="oneshot" customisable>Journey on the Venice Simplon-Orient-Express from London for a luxurious overnight trip to Venice.</ExpensiveItemContainer>
						<ExpensiveItemContainer name="Bespoke Suit from Gieves & Hawkes" price={5000} type="oneshot" link="https://www.gievesandhawkes.com/" customisable>Originally founded as two separate companies, Gieves & Hawkes made a name for itself by crafting uniforms for the military, an association that means today the tailoring house possesses all three main Royal Warrants, for HM The Queen, HRH The Duke of Edinburgh and HRH The Prince of Wales.</ExpensiveItemContainer>
						<ExpensiveItemContainer name="A Three Course Meal at Restaurant Gordon Ramsay" price={130} type="oneshot" link="https://www.gordonramsayrestaurants.com/restaurant-gordon-ramsay/" customisable>Being one of just two London restaurants that hold three Michelin stars, Restaurant Gordon Ramsay offers classic French dishes and a top-notch service that’s hard to beat.</ExpensiveItemContainer>
						{/* Code rendering the user's items */}
						{this.props.user_items.map(item => {
							if(item.customisable) {
								// console.log(item.link);
								return <ExpensiveItemContainer name={item.name} price={item.price} type={item.type} link={item.link} key={item.name + "100"} customisable>{item.description}</ExpensiveItemContainer>
							}
							else if(item.type === "oneshot") {
								// console.log(item.link);
								return <ExpensiveItemContainer name={item.name} price={item.price} type={item.type} link={item.link} key={item.name + "100"} customisable={this.props.force_customisable}>{item.description}</ExpensiveItemContainer>
							}
							else {
								return <ExpensiveItemContainer name={item.name} price={item.price} type={item.type} link={item.link} key={item.name + "100"}>{item.description}</ExpensiveItemContainer>
							}
						})}
						{/* Form for the user to create their own item */}
						<Card className="my-3 mx-auto p-4">
							<h2 className="text-center">Create a new item</h2>
							<Form>
								<Row>
									<Col xs="3" className="pr-0">
										<Form.Group>
											<Form.Label htmlFor="price-input">Price:</Form.Label> {" "}
											<input type="number" id="price-input" defaultValue={0} className="length" required />
										</Form.Group>
										<Form.Group>
											<select id="type-input">
												<option value="oneshot">Onetime</option>
												<option value="daily">Daily</option>
												<option value="weekly">Weekly</option>
												<option value="monthly">Monthly</option>
												<option value="yearly">Yearly</option>
												<option value="customisable">Customisable</option>
											</select>
										</Form.Group>
									</Col>
									<Col xs="9" className="pl-0">
										<Card.Body className="p-0">
											<Form.Group>
												<Form.Label htmlFor="name-input">Name:</Form.Label> {" "}
												<input type="text" id="name-input" className="w-75" required />
											</Form.Group>
											<Form.Group>
												<Form.Label htmlFor="link-input">Link:</Form.Label> {" "}
												<input type="text" id="link-input" className="w-75" />
											</Form.Group>
											<Form.Group>
												<Form.Label htmlFor="description-input">Description:</Form.Label> {" "}
												<Form.Control as="textarea" id="description-input" />
											</Form.Group>
										</Card.Body>
									</Col>
								</Row>
								<Button variant="primary" type="submit" onClick={this.createItem} block>Submit</Button>
							</Form>
						</Card>
					{/* </Row> */}
				</Container>
			</div>
		)
	}
}

function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,
		currency: state.settingsReducer.currency,
		several_years_setting: state.settingsReducer.several_years_setting,
		several_years_value: state.settingsReducer.several_years_value,
		price_text_form: state.settingsReducer.price_text_form,
		force_customisable: state.settingsReducer.force_customisable,
		user_items: state.itemReducer.user_items
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeCurrency: changeCurrency,
		toggleSeveralYears: toggleSeveralYears,
		setSeveralYearsValue: setSeveralYearsValue,
		changePriceTextForm: changePriceTextForm,
		toggleForceCustomisable: toggleForceCustomisable,
		createNewItem: createNewItem
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(RichList);
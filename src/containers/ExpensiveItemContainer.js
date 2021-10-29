import React from "react";
import {connect} from "react-redux";
import ExpensiveItem from "../components/ExpensiveItem";
import {bindActionCreators} from "redux";
import {changeType} from "../actions/itemActions";

class ExpensiveItemContainer extends React.Component {
	constructor(props) {
		super(props);
		this.getQuantity = this.getQuantity.bind(this);
		this.getPriceText = this.getPriceText.bind(this);
		this.getSubtotalText = this.getSubtotalText.bind(this);
		this.changeItemType = this.changeItemType.bind(this);
		this.getItemType = this.getItemType.bind(this);
	}

	getQuantity() {
		if(this.props.items[this.props.items.findIndex(item => item.name === this.props.name)]) {
			// console.log("correct route");
			return this.props.items[this.props.items.findIndex(item => item.name === this.props.name)].quantity;
		}
		else {
			return 0;
		}
	}

	getPriceText() {
		// let price_text = this.props.currency;
		let item_price = this.props.price;
		if(this.props.currency === "€") {
			item_price *= 1.12;
		}
		else if(this.props.currency === "$") {
			item_price *= 1.33;
		}
		item_price = Math.round(item_price);
		return this.props.currency + this.priceToText(item_price);
	}

	getSubtotalText() {
		// let subtotal_text = this.props.currency;
		let subtotal;
		if(this.props.items[this.props.items.findIndex(item => item.name === this.props.name)]) {
			let str = this.props.items[this.props.items.findIndex(item => item.name === this.props.name)].type;
			if(str.substring(str.length - 3) !== "ing" || str === "yearly-recurring") {
				subtotal = this.props.price * this.props.items[this.props.items.findIndex(item => item.name === this.props.name)].quantity;
			}
			else if(str === "daily-recurring") {
				subtotal = this.props.price * this.props.items[this.props.items.findIndex(item => item.name === this.props.name)].quantity * 365;
			}
			else if(str === "weekly-recurring") {
				subtotal = this.props.price * this.props.items[this.props.items.findIndex(item => item.name === this.props.name)].quantity * 52;
			}
			else {
				subtotal = this.props.price * this.props.items[this.props.items.findIndex(item => item.name === this.props.name)].quantity * 12;
			}
		}
		else {
			subtotal = 0;
		}
		if(this.props.currency === "€") {
			subtotal *= 1.12;
		}
		else if(this.props.currency === "$") {
			subtotal *= 1.33;
		}
		subtotal = Math.round(subtotal);
		return this.props.currency + this.priceToText(subtotal);
	}

	changeItemType() {
		this.props.changeType(this.props.name, document.getElementById(this.props.name + "-select").value);
	}

	getItemType() {
		if(this.props.customisables.findIndex(item => item.name === this.props.name) === -1) {
			return "oneshot";
		}
		else {
			return this.props.customisables[this.props.customisables.findIndex(item => item.name === this.props.name)].type;
		}
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

	render() {
		if(this.props.customisable) {
			return (
				<ExpensiveItem quantity={this.getQuantity()} name={this.props.name} type={this.getItemType()} description={this.props.children} priceText={this.getPriceText()} subtotal={this.getSubtotalText()} price={this.props.price} change={this.changeItemType} link={this.props.link} customisable />
			);
		}
		return (
			<ExpensiveItem quantity={this.getQuantity()} name={this.props.name} type={this.props.type} description={this.props.children} priceText={this.getPriceText()} subtotal={this.getSubtotalText()} price={this.props.price} link={this.props.link} />
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.itemReducer.items,
		customisables: state.itemReducer.customisables,
		currency: state.settingsReducer.currency,
		price_text_form: state.settingsReducer.price_text_form
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		changeType: changeType
	}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(ExpensiveItemContainer);
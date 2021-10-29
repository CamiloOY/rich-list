import React from "react";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import LengthControlContainer from "../containers/LengthControlContainer";
import ReadMoreContainer from "../containers/ReadMoreContainer";
import "../styles/ExpensiveItem.scss";

export default function ExpensiveItem(props) {
	return (
		<Card className="my-3 mx-auto p-4 ExpensiveItem">
			<Row>
				<Col xs="3" className="pr0 d-flex">
					<div className="mx-auto my-auto item-cost-info">
						<Card.Subtitle className="item-price">{props.priceText} {props.type === "daily" && "per day"}{props.type === "weekly" && "per week"}{props.type === "monthly" && "per month"}{props.type === "yearly" && "per year"}</Card.Subtitle>
						<LengthControlContainer quantity={props.quantity} name={props.name} price={props.price} type={props.type} />
						<Card.Subtitle>Subtotal: {props.subtotal}</Card.Subtitle>
						{props.customisable && <select onChange={props.change} id={props.name + "-select"} className="mt-1 period-select"><option value="oneshot">Onetime</option><option value="daily-recurring">Daily</option><option value="weekly-recurring">Weekly</option><option value="monthly-recurring">Monthly</option><option value="yearly-recurring">Yearly</option></select>}
					</div>
				</Col>
				<Col xs="9" className="pl0">
					<Card.Body className="p-0">
						<Card.Title><a href={props.link} className="item-link">{props.name}</a></Card.Title>
						<ReadMoreContainer><Card.Text className="item-description">{props.description}</Card.Text></ReadMoreContainer>
					</Card.Body>
				</Col>
			</Row>
		</Card>
	);
}
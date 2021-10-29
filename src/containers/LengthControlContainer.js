import React from "react";
import {bindActionCreators} from "redux";
import {connect} from "react-redux";
import LengthControl from "../components/LengthControl";
import {increaseQuantity, decreaseQuantity, changeQuantity} from "../actions/itemActions";

class LengthControlContainer extends React.Component {
	constructor(props) {
		super(props);
		// this.getLength = this.getLength.bind(this);
		this.increaseLength = this.increaseLength.bind(this);
		this.decreaseLength = this.decreaseLength.bind(this);
		this.changeLength = this.changeLength.bind(this);
	}

	increaseLength() {
		this.props.increaseQuantity(this.props.name, this.props.quantity, this.props.price, this.props.type);
	}

	decreaseLength() {
		if(this.props.quantity !== 0) {
			this.props.decreaseQuantity(this.props.name, this.props.quantity, this.props.price, this.props.type);
		}
	}

	changeLength() {
		let newQuantity = document.getElementById(this.props.name + "-lc").value;
		this.props.changeQuantity(this.props.name, newQuantity, this.props.price, this.props.type);
	}

	render() {
		return (
			<LengthControl length={this.props.quantity} up={this.increaseLength} down={this.decreaseLength} change={this.changeLength} id={this.props.name + "-lc"} />
		);
	}
}

function mapStateToProps(state) {
	return {
		items: state.items
	};
}

function mapDispatchToProps(dispatch) {
	return bindActionCreators({
		increaseQuantity: increaseQuantity,
		decreaseQuantity: decreaseQuantity,
		changeQuantity: changeQuantity
	}, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(LengthControlContainer);
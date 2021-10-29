import React from "react";
import "../styles/LengthControl.scss";
import {faArrowUp, faArrowDown} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

export default function LengthControl(props) {
	return (
		<div className="LengthControl mx-auto my-2">
			<button value="increase" onClick={props.up} className="increase lc-button p-0 mr-1"><FontAwesomeIcon icon={faArrowUp} /></button>
			{/* <span className="length">{props.length}</span> */}
			<input type="number" value={props.length} onChange={props.change} min="0" id={props.id} className="length" />
			<button value="decrease" onClick={props.down} className="decrease lc-button p-0 ml-1"><FontAwesomeIcon icon={faArrowDown} /></button>
			{/* <FontAwesomeIcon icon={faArrowDown} onClick={props.down} id={props.subject.toLowerCase() + "-decrease"} className="decrease lc-button" /> */}
			{/* <button value="decrease" onClick={props.down} id={props.subject.toLowerCase() + "-decrease"} className="decrease">Down</button> */}
		</div>
	);
}
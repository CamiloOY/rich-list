import {INCREASE_QUANTITY, DECREASE_QUANTITY, CHANGE_QUANTITY, CHANGE_TYPE, CREATE_NEW_ITEM} from "../actions/itemActions";
const clone = require('rfdc')();

const defaultState = {
	items: [],
	customisables: [],
	user_items: []
};

export default function itemReducer(state = defaultState, action) {
	switch(action.type) {
		case INCREASE_QUANTITY:
			let incState = clone(state);
			if(state.items.findIndex(item => item.name === action.payload.name) === -1) {
				let newItem = action.payload;
				newItem.quantity++;
				incState.items.push(newItem);
			}
			else {
				// console.log(JSON.stringify(incState));
				// console.log(state.items.findIndex(item => item.name === action.payload.name));
				// console.log(incState[state.items.findIndex(item => item.name === action.payload.name)]);
				incState.items[state.items.findIndex(item => item.name === action.payload.name)].quantity++;
			}
			return incState;
			break;
		case DECREASE_QUANTITY:
			let decState = clone(state);
			if(state.items.find(item => item.name === action.payload.name).quantity === 1) {
				decState.items.splice(state.items.findIndex(item => item.name === action.payload.name), 1);
			}
			else if(action.payload.quantity === "") {
				return state;
			}
			else {
				decState.items[state.items.findIndex(item => item.name === action.payload.name)].quantity--;
			}
			return decState;
			break;
		case CHANGE_QUANTITY:
			// console.log("onchange called");
			let chaState = clone(state);
			// console.log("action.payload.quantity: " + action.payload.quantity);
			if(action.payload.quantity < 0 || action.payload.quantity % 1 !== 0) {
				// console.log("returning state");
				return state;
			}
			// else if(action.payload.quantity === "") {
			// 	chaState.items[state.items.findIndex(item => item.name === action.payload.name)].quantity = 0;
			// }
			else if(state.items.findIndex(item => item.name === action.payload.name) === -1) {
				chaState.items.push(action.payload);
			}
			else if(state.items.find(item => item.name === action.payload.name).quantity === 0) {
				chaState.items.splice(state.items.findIndex(item => item.name === action.payload.name), 1);
			}
			else {
				// console.log("setting new quantity");
				chaState.items[state.items.findIndex(item => item.name === action.payload.name)].quantity = action.payload.quantity;
			}
			return chaState;
			break;
		case CHANGE_TYPE:
			let typState = clone(state);
			if(state.items.findIndex(item => item.name === action.payload.name) !== -1) {
				typState.items[typState.items.findIndex(ite => ite.name === action.payload.name)].type = action.payload.type;
			}
			if(state.customisables.findIndex(item => item.name === action.payload.name) === -1) {
				typState.customisables.push(action.payload);
			}
			else {
				typState.customisables[typState.customisables.findIndex(item => item.name === action.payload.name)].type = action.payload.type;
			}
			// console.log(JSON.stringify(typState));
			return typState;
			break;
		case CREATE_NEW_ITEM:
			let createState = clone(state);
			createState.user_items.push(action.payload);
			return createState;
			break;
		default:
			return state;
			break;
	}
}
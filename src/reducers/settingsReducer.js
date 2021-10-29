import {CHANGE_CURRENCY, TOGGLE_SEVERAL_YEARS, SET_SEVERAL_YEARS, CHANGE_PRICE_TEXT_FORM, TOGGLE_FORCE_CUSTOMISABLE} from "../actions/settingsActions";
const clone = require("rfdc")();

const defaultState = {
	currency: "£",
	several_years_setting: false,
	several_years_value: 1,
	price_text_form: "words",
	force_customisable: false
}

export default function settingsReducer(state = defaultState, action) {
	switch(action.type) {
		case CHANGE_CURRENCY:
			let currencyState = clone(state);
			currencyState.currency = action.payload;
			return currencyState;
			break;
		case TOGGLE_SEVERAL_YEARS:
			let togState = clone(state);
			togState.several_years_setting = !state.several_years_setting;
			return togState;
			break;
		case SET_SEVERAL_YEARS:
			let severalYearsState = clone(state);
			severalYearsState.several_years_value = action.payload;
			return severalYearsState;
			break;
		case CHANGE_PRICE_TEXT_FORM:
			let textState = clone(state);
			textState.price_text_form = action.payload;
			return textState;
			break;
		case TOGGLE_FORCE_CUSTOMISABLE:
			let forceState = clone(state);
			forceState.force_customisable = !state.force_customisable;
			return forceState;
			break;
		default:
			return state;
			break;
	}
}
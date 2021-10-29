export const CHANGE_CURRENCY = "CHANGE_CURRENCY";
export const TOGGLE_SEVERAL_YEARS = "TOGGLE_SEVERAL_YEARS";
export const SET_SEVERAL_YEARS = "SET_SEVERAL_YEARS";
export const CHANGE_PRICE_TEXT_FORM = "CHANGE_PRICE_TEXT_FORM";
export const TOGGLE_FORCE_CUSTOMISABLE = "TOGGLE_FORCE_CUSTOMISABLE";

export function changeCurrency(currency) {
	return {
		type: CHANGE_CURRENCY,
		payload: currency
	};
}

export function toggleSeveralYears() {
	return {
		type: TOGGLE_SEVERAL_YEARS
	};
}

export function setSeveralYearsValue(value) {
	return {
		type: SET_SEVERAL_YEARS,
		payload: value
	};
}

export function changePriceTextForm(form) {
	return {
		type: CHANGE_PRICE_TEXT_FORM,
		payload: form
	};
}

export function toggleForceCustomisable() {
	return {
		type: TOGGLE_FORCE_CUSTOMISABLE
	};
}
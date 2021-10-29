export const INCREASE_QUANTITY = "INCREASE_QUANTITY";
export const DECREASE_QUANTITY = "DECREASE_QUANTITY";
export const CHANGE_QUANTITY = "CHANGE_QUANTITY";
export const CHANGE_TYPE = "CHANGE_TYPE";
export const CREATE_NEW_ITEM = "CREATE_NEW_ITEM";

export function increaseQuantity(name, quantity, price, type) {
	return {
		type: INCREASE_QUANTITY,
		payload: {
			name,
			quantity,
			price,
			type
		}
	};
}

export function decreaseQuantity(name, quantity, price, type) {
	return {
		type: DECREASE_QUANTITY,
		payload: {
			name,
			quantity,
			price,
			type
		}
	};
}

export function changeQuantity(name, quantity, price, type) {
	return {
		type: CHANGE_QUANTITY,
		payload: {
			name,
			quantity,
			price,
			type
		}
	};
}

export function changeType(name, type) {
	return {
		type: CHANGE_TYPE,
		payload: {
			name,
			type
		}
	};
}

export function createNewItem(name, price, type, link, customisable, description) {
	return {
		type: CREATE_NEW_ITEM,
		payload: {
			name,
			price,
			type,
			link,
			customisable,
			description
		}
	}
}
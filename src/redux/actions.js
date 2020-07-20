export const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";

export function setSelectedProduct({productCode, price}) {
	return { type: SET_SELECTED_PRODUCT, productCode, price };
}

// product = {price: num, code: string}
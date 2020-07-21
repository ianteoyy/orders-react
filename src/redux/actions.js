export const SET_SELECTED_PRODUCT = "SET_SELECTED_PRODUCT";
export const SET_ORDER_ID = "SET_ORDER_ID";
export const SET_PAYMENT_STATUS = "SET_PAYMENT_STATUS";

export function setSelectedProduct({ productCode, price }) {
  return { type: SET_SELECTED_PRODUCT, productCode, price };
}

export function setOrderId(orderId) {
  return { type: SET_ORDER_ID, orderId };
}

export function setPaymentStatus(paymentStatus) {
  return { type: SET_PAYMENT_STATUS, paymentStatus };
}

// product = {price: num, code: string}

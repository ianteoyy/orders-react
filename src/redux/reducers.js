import { combineReducers } from "redux";

const {
  SET_SELECTED_PRODUCT,
  SET_ORDER_ID,
  SET_PAYMENT_STATUS,
} = require("./actions");

const initialOrders = {
  productCode: "",
  price: 0,
  orderId: "",
};

function ordersReducer(state = initialOrders, action) {
  switch (action.type) {
    case SET_SELECTED_PRODUCT:
      return { ...state, productCode: action.productCode, price: action.price };
    case SET_ORDER_ID:
      return { ...state, orderId: action.orderId };
    case SET_PAYMENT_STATUS:
      return { ...state, paymentStatus: action.paymentStatus };
    default:
      return state;
  }
}

export default combineReducers({ ordersReducer });

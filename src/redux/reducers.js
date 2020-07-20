import { combineReducers } from "redux";

const { SET_SELECTED_PRODUCT } = require("./actions");

const initialOrders = {
  productCode: "",
  price: 0,
};

function ordersReducer(state = initialOrders, action) {
  switch (action.type) {
    case SET_SELECTED_PRODUCT:
      return { ...state, productCode: action.productCode, price: action.price };
    default:
      return state;
  }
}

export default combineReducers({ ordersReducer });

"use client";
import { cartConstants } from "../actions/constants";

const initState = {
  cart: {},
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case cartConstants.ADD_TO_CART_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case cartConstants.ADD_TO_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
      };
      break;
    case cartConstants.ADD_TO_CART_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    case cartConstants.CART_GET_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case cartConstants.CART_GET_SUCCESS:
      state = {
        ...state,
        cart: action.payload,
        loading: false,
        error: null,
      };
      break;
    case cartConstants.CART_GET_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    case cartConstants.REMOVE_CART_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case cartConstants.REMOVE_CART_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case cartConstants.REMOVE_CART_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
  }
  return state;
};

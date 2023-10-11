"use client";
import { orderConstant } from "../actions/constants";

const initState = {
  order: {},
  loading: false,
  error: null,
  orderPlaced: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case orderConstant.ORDER_PLACE_REQUEST:
      state = {
        ...state,
        loading: true,
        orderPlaced: false,
      };
      break;
    case orderConstant.ORDER_PLACE_SUCCESS:
      state = {
        ...state,
        order: action.payload,
        loading: false,
        orderPlaced: true,
        error: null,
      };
      break;
    case orderConstant.ORDER_PLACE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
  }
  return state;
};

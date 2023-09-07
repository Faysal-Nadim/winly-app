"use client";
import { productConst } from "../actions/constants";

const initState = {
  products: {},
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case productConst.PRODUCT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case productConst.PRODUCT_SUCCESS:
      state = {
        ...state,
        products: action.payload,
        loading: false,
      };
      break;
    case productConst.PRODUCT_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
  }
  return state;
};

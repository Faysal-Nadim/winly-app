import axiosInstance from "../helpers/axios";
import { cartConstants } from "./constants";
import Toast from "react-native-toast-message";

export const getCartItems = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.CART_GET_REQUEST });
      const res = await axiosInstance.get(`/user/cart/get`);

      if (res.status === 200) {
        dispatch({
          type: cartConstants.CART_GET_SUCCESS,
          payload: res.data.cart,
        });
      }
    } catch (error) {
      dispatch({
        type: cartConstants.CART_GET_FAILURE,
        payload: error.response,
      });
    }
  };
};

export const addToCart = (item, qty) => {
  return async (dispatch) => {
    try {
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const cartData = {
        cartItems: {
          campaign: item._id,
          price: item.price,
          qty: qty,
        },
      };

      const res = await axiosInstance.post(`/user/cart/add`, cartData);

      if (res.status === 201) {
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: res.data,
        });
        Toast.show({
          type: "success",
          text1: "Add To Cart Success",
          text2: "Item Added To Your Cart Successfully!",
          visibilityTime: 1000,
        });
        dispatch(getCartItems());
      }
    } catch (error) {
      // Swal.close();
      const { data } = error?.response;
      dispatch({
        type: cartConstants.ADD_TO_CART_FAILURE,
        payload: data,
      });
    }
  };
};

export const updateCart = (item, qty) => {
  return async (dispatch) => {
    try {
      // Swal.showLoading();
      dispatch({ type: cartConstants.ADD_TO_CART_REQUEST });
      const cartData = {
        cartItems: {
          campaign: item._id,
          price: item.price,
          qty: qty,
        },
      };

      const res = await axiosInstance.post(`/user/cart/add`, cartData);

      if (res.status === 201) {
        // Swal.close();
        dispatch({
          type: cartConstants.ADD_TO_CART_SUCCESS,
          payload: res.data,
        });
        dispatch(getCartItems());
      }
    } catch (error) {
      // Swal.close();
      const { data } = error?.response;
      dispatch({
        type: cartConstants.ADD_TO_CART_FAILURE,
        payload: data,
      });
      // Swal.fire({
      //   icon: "error",
      //   title: data.msg,
      //   showConfirmButton: false,
      //   timer: 1000,
      //   iconColor: "#000",
      // });
    }
  };
};

export const removeCart = (data) => {
  return async (dispatch) => {
    // Swal.showLoading();
    dispatch({ type: cartConstants.REMOVE_CART_REQUEST });
    const res = await axiosInstance.post(`/user/cart/remove`, data);
    if (res.status === 202) {
      // Swal.close();
      dispatch({ type: cartConstants.REMOVE_CART_SUCCESS });
      dispatch(getCartItems());
    } else {
      // Swal.close();
      const { error } = res.data;
      dispatch({
        type: cartConstants.REMOVE_CART_FAILURE,
        payload: { error },
      });
    }
  };
};

import AsyncStorage from "@react-native-async-storage/async-storage";
import axiosInstance from "../helpers/axios";
import { isUserLoggedIn } from "./auth.action";
import { orderConstant } from "./constants";

export const orderPlace = (order) => {
  return async (dispatch) => {
    try {
      dispatch({ type: orderConstant.ORDER_PLACE_REQUEST });

      const res = await axiosInstance.post(`/user/order/place`, order);
      if (res.status === 201) {
        const { order, user } = res.data;
        await AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch(isUserLoggedIn());
        dispatch({
          type: orderConstant.ORDER_PLACE_SUCCESS,
          payload: res.data,
        });
        window.location.replace("/order/success");
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: orderConstant.ORDER_PLACE_FAILURE,
        payload: error,
      });
    }
  };
};

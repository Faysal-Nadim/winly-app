import axiosInstance from "../helpers/axios";
import { productConst } from "./constants";

export const getProducts = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: productConst.PRODUCT_REQUEST });

      const res = await axiosInstance.get(`/product/get`);
      if (res.status === 200) {
        dispatch({
          type: productConst.PRODUCT_SUCCESS,
          payload: res.data.products,
        });
      }
    } catch (error) {
      // const { data } = error?.response;
      const { data } = error;
      dispatch({
        type: productConst.PRODUCT_FAILURE,
        payload: data,
      });
    }
  };
};

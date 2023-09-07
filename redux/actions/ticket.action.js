import axiosInstance from "../helpers/axios";
import { ticketConst } from "./constants";

export const getTicket = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: ticketConst.TICKET_REQUEST });
      const res = await axiosInstance.get(`/user/ticket/get`);

      if (res.status === 200) {
        dispatch({
          type: ticketConst.TICKET_SUCCESS,
          payload: res.data.tickets,
        });
      }
    } catch (error) {
      const { data } = error?.response;
      dispatch({
        type: ticketConst.TICKET_FAILURE,
        payload: data,
      });
    }
  };
};

import axiosInstance from "@app/redux/helpers/axios";
import Swal from "sweetalert2";
import { campaignConst } from "./constants";

export const getCampaign = () => {
  return async (dispatch) => {
    try {
      Swal.showLoading();
      dispatch({ type: campaignConst.CAMPAIGN_REQUEST });

      const res = await axiosInstance.get(`/campaign/get`);

      if (res.status === 200) {
        Swal.close();
        dispatch({
          type: campaignConst.CAMPAIGN_SUCCESS,
          payload: res.data.campaigns,
        });
      }
    } catch (error) {
      Swal.close();
      dispatch({
        type: campaignConst.CAMPAIGN_FAILURE,
        payload: error,
      });
    }
  };
};

import axiosInstance from "../helpers/axios";
import { campaignConst } from "./constants";

export const getCampaign = () => {
  return async (dispatch) => {
    try {
      dispatch({ type: campaignConst.CAMPAIGN_REQUEST });

      const res = await axiosInstance.get(`/campaign/get`);
      console.log(res.data);
      if (res.status === 200) {
        dispatch({
          type: campaignConst.CAMPAIGN_SUCCESS,
          payload: res.data.campaigns,
        });
      }
    } catch (error) {
      dispatch({
        type: campaignConst.CAMPAIGN_FAILURE,
        payload: error,
      });
    }
  };
};

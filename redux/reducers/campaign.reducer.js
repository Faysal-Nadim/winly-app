"use client";
import { campaignConst } from "../actions/constants";

const initState = {
  campaigns: {},
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case campaignConst.CAMPAIGN_REQUEST:
      state = {
        ...initState,
        loading: true,
      };
      break;
    case campaignConst.CAMPAIGN_SUCCESS:
      state = {
        ...state,
        campaigns: action.payload,
        loading: false,
      };
      break;
    case campaignConst.CAMPAIGN_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
  }
  return state;
};

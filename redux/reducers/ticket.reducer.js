"use client";
import { ticketConst } from "../actions/constants";

const initState = {
  tickets: {},
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case ticketConst.TICKET_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case ticketConst.TICKET_SUCCESS:
      state = {
        ...state,
        tickets: action.payload,
        loading: false,
      };
      break;
    case ticketConst.TICKET_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
  }
  return state;
};

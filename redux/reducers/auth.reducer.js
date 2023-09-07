"use client";
import { authConstant } from "../actions/constants";

const initState = {
  token: null,
  user: {},
  authenticate: false,
  authenticating: false,
  email_sent: false,
  verified: false,
  loading: false,
  error: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case authConstant.LOGIN_REQUEST:
      state = {
        ...state,
        authenticating: true,
        loading: true,
      };
      break;
    case authConstant.LOGIN_SUCCESS:
      state = {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
        authenticate: true,
        authenticating: false,
        loading: false,
      };
      break;
    case authConstant.LOGIN_FAILURE:
      state = {
        ...state,
        error: action.payload,
        loading: false,
      };
      break;
    case authConstant.LOGOUT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstant.LOGOUT_SUCCESS:
      state = {
        ...initState,
      };
      break;
    case authConstant.LOGOUT_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstant.SIGNUP_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case authConstant.SIGNUP_SUCCESS:
      state = {
        ...state,
        loading: false,
      };
      break;
    case authConstant.SIGNUP_FAILURE:
      state = {
        ...state,
        error: action.payload.error,
        loading: false,
      };
      break;
    case authConstant.CODE_REQUEST:
      state = {
        ...state,
        loading: true,
        verified: false,
      };
      break;
    case authConstant.CODE_SUCCESS:
      state = {
        ...state,
        email_sent: true,
        loading: false,
        verified: false,
      };
      break;
    case authConstant.CODE_FAILURE:
      state = {
        ...state,
        error: action.payload,
        verified: false,
        loading: false,
      };
      break;
    case authConstant.VERIFY_REQUEST:
      state = {
        ...state,
        loading: true,
        verified: false,
      };
      break;
    case authConstant.VERIFY_SUCCESS:
      state = {
        ...state,
        verified: true,
        loading: false,
        error: null,
      };
      break;
    case authConstant.VERIFY_FAILURE:
      state = {
        ...state,
        error: action.payload,
        verified: false,
        loading: false,
      };
      break;
    case authConstant.PICTURE_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case authConstant.PICTURE_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case authConstant.PICTURE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
    case authConstant.PROFILE_UPDATE_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case authConstant.PROFILE_UPDATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case authConstant.PROFILE_UPDATE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
    case authConstant.PASS_UPDATE_REQUEST:
      state = {
        ...state,
        loading: true,
        error: null,
      };
      break;
    case authConstant.PASS_UPDATE_SUCCESS:
      state = {
        ...state,
        loading: false,
        error: null,
        user: action.payload,
      };
    case authConstant.PASS_UPDATE_FAILURE:
      state = {
        ...state,
        loading: false,
        error: action.payload,
      };
      break;
  }
  return state;
};

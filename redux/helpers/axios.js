import axios from "axios";
import { api } from "./urlConfig";
import store from "../store";
import { authConstant } from "../actions/constants";
import AsyncStorage from "@react-native-async-storage/async-storage";

let token;

AsyncStorage.getItem("token", (err, result) => {
  token = result;
});

const axiosInstance = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

axiosInstance.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

axiosInstance.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
    const status = error.response ? error.response.status : 500;
    if (status && status === 500) {
      localStorage.clear();
      store.dispatch({ type: authConstant.LOGOUT_SUCCESS });
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;

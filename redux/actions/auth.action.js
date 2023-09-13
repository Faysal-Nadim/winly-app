import axios from "axios";
import axiosInstance from "../helpers/axios";
import { authConstant } from "./constants";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Toast from "react-native-toast-message";

export const login = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.LOGIN_REQUEST });
      const res = await axiosInstance.post(`/user/auth/signin`, {
        ...user,
      });

      if (res.status === 200) {
        const { token, user } = res.data;
        await AsyncStorage.setItem("token", token);
        await AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstant.LOGIN_SUCCESS,
          payload: {
            token,
            user,
          },
        });
        Toast.show({
          type: "success",
          text1: `Hello ${user.fullName}`,
          text2: `${res.data.msg}`,
        });
      }
    } catch (error) {
      const { data } = error?.response;
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
      Toast.show({
        type: "error",
        text1: `${data.msg}`,
        text2: `Status ${error.response.status}`,
      });
    }
  };
};

export const signUp = (user) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.SIGNUP_REQUEST });
      const res = await axiosInstance.post(`/user/auth/signup`, user);
      if (res.status === 201) {
        dispatch({
          type: authConstant.SIGNUP_SUCCESS,
          payload: res.data.user,
        });
        // Swal.fire({
        //   icon: "success",
        //   title: "Registration Success",
        //   text: `${res.data.msg}`,
        //   showConfirmButton: false,
        //   timer: 1500,
        //   iconColor: "#000",
        // }).then(() => {
        //   window.location.replace(
        //     `/login/verify-email?email=${res.data.user.email}`
        //   );
        // });
      } else {
        dispatch({
          type: authConstant.SIGNUP_FAILURE,
          payload: { error: res.data.error },
        });
      }
    } catch (error) {
      const { data } = error?.response;
      dispatch({
        type: authConstant.SIGNUP_FAILURE,
        payload: { error: data.error },
      });
      // Swal.fire({
      //   icon: "error",
      //   title: "Registration Failed",
      //   text: `${data.msg}`,
      //   showConfirmButton: false,
      //   timer: 1500,
      //   iconColor: "#000",
      // });
    }
  };
};

export const isUserLoggedIn = () => {
  return async (dispatch) => {
    const token = await AsyncStorage.getItem("token");

    if (token) {
      const user = JSON.parse(await AsyncStorage.getItem("user"));
      dispatch({
        type: authConstant.LOGIN_SUCCESS,
        payload: {
          token,
          user,
        },
      });
    } else {
      dispatch({
        type: authConstant.LOGIN_FAILURE,
        payload: { error: "Failed to login!" },
      });
    }
  };
};

export const signout = () => {
  return async (dispatch) => {
    dispatch({ type: authConstant.LOGOUT_REQUEST });
    const res = await axiosInstance.get(`/user/auth/signout`);

    if (res.status === 200) {
      await AsyncStorage.multiRemove(["token", "user"]);
      dispatch({ type: authConstant.LOGOUT_SUCCESS });
      // Swal.fire({
      //   icon: "info",
      //   title: "Logout Success",
      //   showConfirmButton: false,
      //   timer: 1000,
      //   iconColor: "#000",
      // }).then(() => {
      //   window.location.replace("/login");
      // });
    } else {
      dispatch({
        type: authConstant.LOGOUT_FAILURE,
        payload: { error: res.data.error },
      });
    }
  };
};

export const requestCode = (data) => {
  return async (dispatch) => {
    dispatch({ type: authConstant.CODE_REQUEST });
    try {
      const res = await axiosInstance.post(`/user/auth/email/sendcode`, data);
      if (res.status === 202) {
        dispatch({
          type: authConstant.CODE_SUCCESS,
          payload: { msg: res.data.msg, status: res.status },
        });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstant.CODE_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
      // Swal.fire({
      //   icon: "info",
      //   title: "Something went wrong. Please click Resend button.",
      //   showConfirmButton: false,
      //   timer: 1500,
      //   iconColor: "#000",
      // });
    }
  };
};

export const verifyCode = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.VERIFY_REQUEST });
      const res = await axiosInstance.post(`/user/auth/email/verify`, data);
      if (res.status === 202) {
        dispatch({
          type: authConstant.VERIFY_SUCCESS,
          payload: res.data,
        });
        // Swal.fire({
        //   icon: "success",
        //   title: "Congratulations!",
        //   text: `${res.data.msg}`,
        //   showConfirmButton: false,
        //   timer: 1500,
        //   iconColor: "#000",
        // }).then(() => {
        //   window.location.replace("/login");
        // });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstant.VERIFY_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
      // Swal.fire({
      //   icon: "error",
      //   title: `${data.msg}`,
      //   showConfirmButton: false,
      //   timer: 1500,
      //   iconColor: "#000",
      // });
    }
  };
};

export const verifyCodeForPassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.VERIFY_REQUEST });
      const res = await axiosInstance.post(
        `/user/auth/password/email/verify`,
        data
      );
      if (res.status === 202) {
        dispatch({
          type: authConstant.VERIFY_SUCCESS,
          payload: res.data,
        });
        // Swal.fire({
        //   icon: "success",
        //   title: "Congratulations!",
        //   text: `${res.data.msg}`,
        //   showConfirmButton: false,
        //   timer: 1000,
        //   iconColor: "#000",
        // });
      }
    } catch (error) {
      const { data } = error.response;
      dispatch({
        type: authConstant.VERIFY_FAILURE,
        payload: { msg: data.msg, status: error.response.status },
      });
      // Swal.fire({
      //   icon: "error",
      //   title: `${data.msg}`,
      //   showConfirmButton: false,
      //   timer: 1500,
      //   iconColor: "#000",
      // });
    }
  };
};

export const updateImage = (form) => {
  return async (dispatch) => {
    const API = "b2b471ada4942812ae96473fbb15fa66";
    await axios
      .post(`https://api.imgbb.com/1/upload?key=${API}`, form)
      .then(async (res) => {
        const data = {
          img: {
            url: res?.data?.data?.display_url,
          },
        };
        try {
          dispatch({ type: authConstant.PICTURE_REQUEST });
          const res = await axiosInstance.post(`/user/auth/update/img`, data);

          if (res.status === 200) {
            const { user, msg } = res.data;
            await AsyncStorage.setItem("user", JSON.stringify(user));
            dispatch({
              type: authConstant.PICTURE_SUCCESS,
              payload: user,
            });
            // Swal.fire({
            //   icon: "success",
            //   title: `${msg}`,
            //   showConfirmButton: false,
            //   timer: 1000,
            //   iconColor: "#000",
            // }).then(() => {
            //   window.location.reload();
            // });
          }
        } catch (err) {
          const { data } = err.response;
          dispatch({
            type: authConstant.PICTURE_FAILURE,
            payload: { msg: data.msg, status: err.response.status },
          });
          // Swal.fire({
          //   icon: "error",
          //   title: `${data.msg}`,
          //   showConfirmButton: false,
          //   timer: 1500,
          //   iconColor: "#000",
          // });
        }
      })
      .catch((error) => {
        dispatch({
          type: authConstant.PICTURE_FAILURE,
          payload: error,
        });
      });
  };
};

export const updateProfile = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.PROFILE_UPDATE_REQUEST });
      const res = await axiosInstance.post(`/user/auth/update/profile`, data);

      if (res.status === 200) {
        const { user, msg } = res.data;
        await AsyncStorage.setItem("user", JSON.stringify(user));
        dispatch({
          type: authConstant.PICTURE_SUCCESS,
          payload: user,
        });
        // Swal.fire({
        //   icon: "success",
        //   title: `${msg}`,
        //   showConfirmButton: false,
        //   timer: 1000,
        //   iconColor: "#000",
        // });
      }
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: authConstant.PICTURE_FAILURE,
        payload: { msg: data.msg, status: err.response.status },
      });
      // Swal.fire({
      //   icon: "error",
      //   title: `${data.msg}`,
      //   showConfirmButton: false,
      //   timer: 1500,
      //   iconColor: "#000",
      // });
    }
  };
};

export const updatePassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.PASS_UPDATE_REQUEST });
      const res = await axiosInstance.post(`/user/auth/password/update`, data);

      if (res.status === 200) {
        dispatch({
          type: authConstant.PASS_UPDATE_SUCCESS,
          payload: res.data,
        });
        // Swal.fire({
        //   icon: "success",
        //   title: `${res.data.msg}`,
        //   showConfirmButton: false,
        //   timer: 1000,
        //   iconColor: "#000",
        // });
      }
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: authConstant.PICTURE_FAILURE,
        payload: { msg: data.msg, status: err.response.status },
      });
      // Swal.fire({
      //   icon: "error",
      //   title: `${data.msg}`,
      //   showConfirmButton: false,
      //   timer: 1500,
      //   iconColor: "#000",
      // });
    }
  };
};

export const resetPassword = (data) => {
  return async (dispatch) => {
    try {
      dispatch({ type: authConstant.PASS_UPDATE_REQUEST });
      const res = await axiosInstance.post(`/user/auth/password/reset`, data);

      if (res.status === 200) {
        dispatch({
          type: authConstant.PASS_UPDATE_SUCCESS,
          payload: res.data,
        });
        // Swal.fire({
        //   icon: "success",
        //   title: `${res.data.msg}`,
        //   showConfirmButton: false,
        //   timer: 1000,
        //   iconColor: "#000",
        // }).then(() => {
        //   window.location.replace("/login");
        // });
      }
    } catch (err) {
      const { data } = err.response;
      dispatch({
        type: authConstant.PICTURE_FAILURE,
        payload: { msg: data.msg, status: err.response.status },
      });
      // Swal.fire({
      //   icon: "error",
      //   title: `${data.msg}`,
      //   showConfirmButton: false,
      //   timer: 1500,
      //   iconColor: "#000",
      // });
    }
  };
};

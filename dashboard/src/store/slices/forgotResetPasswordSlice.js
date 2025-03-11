import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

const forgotResetPassSlice = createSlice({
  name: "forgotPassword",
  initialState: {
    loading: false,
    error: null,
    message: null,
  },
  reducers: {
    forgotPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    forgotPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    resetPasswordRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess(state, action) {
      state.loading = false;
      state.error = null;
      state.message = action.payload;
    },
    resetPasswordFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
      state.message = null;
    },
    clearAllErrors(state) {
      state.error = null;
      state.message = null;
    },
  },
});

// Exporting actions
export const {
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  clearAllErrors,
} = forgotResetPassSlice.actions;

// Async Thunk for Forgot Password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch(forgotPasswordRequest());
    const response = await axios.post(
      `${BASE_URL}/user/password/forgot`,
      { email },
      {
        withCredentials: true,
        headers: { "Content-Type": "application/json" },
      }
    );
    dispatch(forgotPasswordSuccess(response.data.message));
  } catch (error) {
    dispatch(
      forgotPasswordFailed(error.response?.data?.message || "Something went wrong")
    );
  }
};

//reset password(not use in func)
export const resetPassword =
  (token,password,confirmPassword) => async (dispatch) => {
    console.log("entered in forgot slice ")
    try {
      dispatch(forgotResetPassSlice.actions.resetPasswordRequest());
      const response = await axios.put(
        `${BASE_URL}/user/password/reset/${token}`,
        { password, confirmPassword },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );
      console.log(response);
      dispatch(
        forgotResetPassSlice.actions.resetPasswordSuccess(response.data.message)
      );
    } catch (error) {
      console.log(error);
      dispatch(
        forgotResetPassSlice.actions.resetPasswordFailed(
          error.response.data.message
        )
      );
    }
  };

export const clearAllForgotResetPassErrors = () => (dispatch) => {
  dispatch(forgotResetPassSlice.actions.clearAllErrors());
};

export default forgotResetPassSlice.reducer;

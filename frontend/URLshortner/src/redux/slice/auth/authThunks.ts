import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkUserloggedIn, checkUserloggedOut } from "./authSlice";
import { userauthHandle } from "../../../connections"; 

export const checkLogIn = createAsyncThunk(
  "auth/checkLogIn",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      const result = await userauthHandle();
      if (result.user) {
        dispatch(checkUserloggedIn(result.user));
        return { success: true, user: result.user };
      } else {
        dispatch(checkUserloggedOut());
        return { success: false };
      }
    } catch (error: any) {
      dispatch(checkUserloggedOut());
      // Provide specific error messages for different failure types
      const errorMessage = error.message?.includes("CORS") || error.message?.includes("Failed to fetch")
        ? "Unable to connect to server. Please check your network connection."
        : error.message || "Authentication check failed";
      return rejectWithValue(errorMessage);
    }
  }
);
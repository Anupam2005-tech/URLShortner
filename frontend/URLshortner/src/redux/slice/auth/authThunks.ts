import { createAsyncThunk } from "@reduxjs/toolkit";
import { checkUserloggedIn, checkUserloggedOut } from "./authSlice";
import { userauthHandle } from "../../../connections"; 

export const checkLogIn = createAsyncThunk(
  "auth/checkLogIn",
  async (_, { dispatch }) => {
    try {
      const result = await userauthHandle();
      if (result.user) {
        dispatch(checkUserloggedIn(result.user));
      } else {
        dispatch(checkUserloggedOut());
      }
    } catch {
      dispatch(checkUserloggedOut());
    }
  }
);
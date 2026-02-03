import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { checkLogIn } from "./authThunks";

interface AuthState {
  isLoggedIn: boolean;
  loginChecked: boolean;
  user: { name?: string } | null;
  error: string | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loginChecked: false,
  user: null,
  error: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    checkUserloggedIn: (
      state,
      action: PayloadAction<{ name?: string } | undefined>,
    ) => {
      state.isLoggedIn = true;
      state.loginChecked = true;
      state.user = action.payload || null;
      state.error = null;
    },
    checkUserloggedOut: (state) => {
      state.isLoggedIn = false;
      state.loginChecked = true;
      state.user = null;
      state.error = null;
    },
    resetLoginCheck: (state) => {
      state.loginChecked = false;
      state.error = null;
    },
    setLoginChecked: (state, action: PayloadAction<boolean>) => {
      state.loginChecked = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkLogIn.pending, (state) => {
        state.loginChecked = false;
        state.error = null;
      })
      .addCase(checkLogIn.fulfilled, (state) => {
        // State is updated by the thunk dispatching checkUserloggedIn/Out
        state.loginChecked = true;
        state.error = null;
      })
      .addCase(checkLogIn.rejected, (state, action) => {
        state.isLoggedIn = false;
        state.loginChecked = true;
        state.user = null;
        state.error = action.error.message || "Authentication check failed";
      });
  },
});

export const {
  checkUserloggedIn,
  checkUserloggedOut,
  resetLoginCheck,
  setLoginChecked,
  clearError,
} = authSlice.actions;

export default authSlice.reducer;

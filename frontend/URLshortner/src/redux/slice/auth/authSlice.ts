import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  loginChecked: boolean;
  user: { name?: string } | null;
}

const initialState: AuthState = {
  isLoggedIn: false,
  loginChecked: false,
  user: null,
};

const authSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    checkUserloggedIn: (state, action: PayloadAction<{ name?: string } | undefined>) => {
      state.isLoggedIn = true;
      state.loginChecked = true;
      state.user = action.payload || null;
    },
    checkUserloggedOut: (state) => {
      state.isLoggedIn = false;
      state.loginChecked = true;
      state.user = null;
    },
    resetLoginCheck: (state) => {
      state.loginChecked = false;
    },
    setLoginChecked: (state, action: PayloadAction<boolean>) => {
      state.loginChecked = action.payload;
    },
  },
});

export const {
  checkUserloggedIn,
  checkUserloggedOut,
  resetLoginCheck,
  setLoginChecked,
} = authSlice.actions;

export default authSlice.reducer;
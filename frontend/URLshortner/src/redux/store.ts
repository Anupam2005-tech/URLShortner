import { configureStore } from "@reduxjs/toolkit";
import authSlice from './slice/auth/authSlice'
import  userLoadingSlice  from "./slice/usersSlice/usersSlice";

export const store = configureStore({
  reducer: {
    authentication:authSlice,
    loading:userLoadingSlice
    
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

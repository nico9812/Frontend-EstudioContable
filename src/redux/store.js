import { configureStore } from '@reduxjs/toolkit';
import { apiSlice } from '@/redux/apiSlice';
import authReducerSlice from '@/redux/reducer/authReducerSlice';

export const store = configureStore({
  reducer: {
    [apiSlice.reducerPath]: apiSlice.reducer,
    auth: authReducerSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: true,
});

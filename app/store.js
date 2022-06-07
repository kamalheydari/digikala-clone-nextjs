import { configureStore } from "@reduxjs/toolkit";

import fetchApi from "app/slices/fetchApiSlice";
import authReducer from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    [fetchApi.reducerPath]: fetchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});

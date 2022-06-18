import { configureStore } from "@reduxjs/toolkit";

import fetchApi from "app/slices/fetchApiSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import modalReducer from "./slices/modalSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    modal: modalReducer,
    users: usersReducer,
    [fetchApi.reducerPath]: fetchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});

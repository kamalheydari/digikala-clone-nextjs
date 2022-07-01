import { configureStore } from "@reduxjs/toolkit";

import fetchApi from "app/slices/fetchApiSlice";
import authReducer from "./slices/authSlice";
import cartReducer from "./slices/cartSlice";
import modalReducer from "./slices/modalSlice";
import categoryReducer from "./slices/categorySlice";
import detailsReducer from "./slices/detailsSlice";
import productReducer from "./slices/productSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    modal: modalReducer,
    categories: categoryReducer,
    details: detailsReducer,
    product: productReducer,
    [fetchApi.reducerPath]: fetchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});

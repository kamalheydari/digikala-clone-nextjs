import { configureStore } from "@reduxjs/toolkit";

import fetchApi from "app/slices/fetchApiSlice";
import authReducer from "app/slices/authSlice";
import cartReducer from "app/slices/cartSlice";
import modalReducer from "app/slices/modalSlice";
import categoryReducer from "app/slices/categorySlice";
import detailsReducer from "app/slices/detailsSlice";
import productReducer from "app/slices/productSlice";
import fitlerReducer from "app/slices/filterSlice";
import reviewsReducer from "app/slices/reviewsSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    modal: modalReducer,
    categories: categoryReducer,
    details: detailsReducer,
    product: productReducer,
    filter: fitlerReducer,
    reviews: reviewsReducer,
    [fetchApi.reducerPath]: fetchApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(fetchApi.middleware),
});

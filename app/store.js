import { configureStore } from "@reduxjs/toolkit";

import fetchApi from "app/slices/fetchApi.slice";
import userReducer from "app/slices/user.slice";
import cartReducer from "app/slices/cart.slice";
import modalReducer from "app/slices/modal.slice";
import categoryReducer from "app/slices/category.slice";
import detailsReducer from "app/slices/details.slice";
import productReducer from "app/slices/product.slice";
import fitlerReducer from "app/slices/filter.slice";
import reviewsReducer from "app/slices/reviews.slice";

export const store = configureStore({
  reducer: {
    user: userReducer,
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

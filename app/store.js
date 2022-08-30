import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/dist/query";

import userReducer from "app/slices/user.slice";
import cartReducer from "app/slices/cart.slice";
import modalReducer from "app/slices/modal.slice";
import categoryReducer from "app/slices/category.slice";
import detailsReducer from "app/slices/details.slice";
import productReducer from "app/slices/product.slice";
import fitlerReducer from "app/slices/filter.slice";
import reviewsReducer from "app/slices/reviews.slice";
import alertReducer from "app/slices/alert.slice";
import apiSlice from "app/api/api";

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
    alert: alertReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (gDM) => gDM().concat(apiSlice.middleware),
});

// enable listener behavior for the store
setupListeners(store.dispatch);

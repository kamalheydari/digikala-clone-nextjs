import { createSlice } from "@reduxjs/toolkit";
import { sorts } from "utils/constatns";

const initialState = {
  sort: sorts[0],
  inStock: false,
  discount: false,
  max_price: 0,
  min_price: 0,
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    resetFilter: (state, action) => {
      state.inStock = false;
      state.discount = false;
      state.sort = sorts[0];
      state.max_price = action.payload.maxPrice;
      state.min_price = action.payload.minPrice;
    },
  },
});

export const { updateFilter, resetFilter } = filterSlice.actions;

export default filterSlice.reducer;

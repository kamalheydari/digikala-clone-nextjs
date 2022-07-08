import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sort: "جدیدترین",
};

const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    updateFilter: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
  },
});

export const { updateFilter } = filterSlice.actions;

export default filterSlice.reducer;

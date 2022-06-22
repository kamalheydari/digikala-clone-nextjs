import { createSlice } from "@reduxjs/toolkit";

const initialState = { category: {}, info: [], specification: [] };

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.category = action.payload;
    },
    addInfo: (state, action) => {
      state.info = action.payload;
    },
    addSpecification: (state, action) => {
      state.specification = action.payload;
    },
    resetDetails: (state, action) => {
      state.category = {};
      state.info = [];
      state.specification = [];
    },
  },
});

export default detailsSlice.reducer;

export const {
  addCategory,
  addSpecification,
  resetDetails,
  addInfo,
} = detailsSlice.actions;

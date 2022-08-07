import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await fetch("/api/category");
    const data = await res.json();
    return data?.categories;
  }
);

const initialState = {
  categories: [],
  mainCategory: "",
  parentCategory: "",
  category: "",
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    selectCategory: (state, action) => {
      state[action.payload.type] = action.payload.value;
    },
    resetParentCategory: (state, action) => {
      state.parentCategory = "";
    },
    resetSelectedCategories: (state, action) => {
      state.parentCategory = "";
      state.mainCategory = "";
      state.category = "";
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchCategories.fulfilled, (state, action) => {
      state.categories = action.payload;
    });
  },
});

export const {
  addCategory,
  resetParentCategory,
  resetSelectedCategories,
  selectCategory,
} = categorySlice.actions;

export default categorySlice.reducer;

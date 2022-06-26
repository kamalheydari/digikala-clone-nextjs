import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchCategories = createAsyncThunk(
  "categories/fetchCategories",
  async () => {
    const res = await fetch(process.env.BASE_URL + "/api/category");
    const data = await res.json();
    return data?.categories;
  }
);

const initialState = {
  categories: [],
  parentCategory: "",
  mainCategory: "",
  category: "",
};
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    selecteMainCategory: (state, action) => {
      state.mainCategory = action.payload;
    },
    selecteParentCategory: (state, action) => {
      state.parentCategory = action.payload;
    },
    selecteCategory: (state, action) => {
      state.category = action.payload;
    },
    resetParentCategory: (state, action) => {
      state.parentCategory = "";
    },
    resetSelectedCategories: (state, action) => {
      state.parentCategory = "";
      state.mainCategory = "";
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
  selecteMainCategory,
  selecteParentCategory,
  resetParentCategory,
  resetSelectedCategories,
  selecteCategory,
} = categorySlice.actions;

export default categorySlice.reducer;

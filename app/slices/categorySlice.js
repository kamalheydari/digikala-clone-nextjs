const { createSlice } = require("@reduxjs/toolkit");

const initialState = { categories: [] };
const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    loadCategories: (state, action) => {
      state.categories = action.payload;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    deleteCategory: (state, action) => {
      const index = state.categories.findIndex(
        (item) => item._id === action.payload
      );
      if (index !== -1) {
        state.categories.splice(index, 1);
      }
    },
  },
});

export const {
  loadCategories,
  deleteCategory,
  addCategory,
} = categorySlice.actions;

export default categorySlice.reducer;

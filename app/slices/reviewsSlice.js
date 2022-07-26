import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  title: "",
  comment: "",
  rating: 1,
  positivePoints: [],
  negativePoints: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    changeReviewsItems: (state, action) => {
      state[action.payload.name] = action.payload.value;
    },
    addReviewsItem: (state, action) => {
      const { type, value } = action.payload;
      if (type === "positivePoints")
        state.positivePoints.push({ id: nanoid(), title: value });

      if (type === "negativePoints")
        state.negativePoints.push({ id: nanoid(), title: value });
    },
    deleteReviewsItem: (state, action) => {
      const { type, id } = action.payload;
      const index = state[type].findIndex((item) => item.id === id);

      if (type === "positivePoints" && index !== -1)
        state.positivePoints.splice(index, 1);
      if (type === "negativePoints" && index !== -1)
        state.negativePoints.splice(index, 1);
    },
    resetReview: (state, action) => {
      state.title = "";
      state.comment = "";
      state.rating = 1;
      state.positivePoints = [];
      state.negativePoints = [];
    },
  },
});

export default reviewsSlice.reducer;

export const {
  changeReviewsItems,
  addReviewsItem,
  deleteReviewsItem,
  resetReview,
} = reviewsSlice.actions;

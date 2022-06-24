import { createSlice, nanoid } from "@reduxjs/toolkit";

const initialState = {
  details_id: "",
  category: {},
  info: [],
  specification: [],
};

const detailsSlice = createSlice({
  name: "details",
  initialState,
  reducers: {
    addInfo: (state, action) => {
      state.info.push({ name: action.payload, id: nanoid() });
    },

    addSpecification: (state, action) => {
      state.specification.push({ name: action.payload, id: nanoid() });
    },

    deleteItem: (state, action) => {
      const { type, id } = action.payload;
      const index = state[type].findIndex((item) => item.id === id);

      if (type === "info" && index !== -1) state.info.splice(index, 1);
      if (type === "specification" && index !== -1)
        state.specification.splice(index, 1);
    },

    editItem: (state, action) => {
      const { id, type, name } = action.payload;
      state[type].forEach((item) => {
        if (item.id === id) {
          item.name = name;
        }
      });
    },

    loadDetails: (state, action) => {
      state.category = action.payload.category;
      state.details_id = action.payload.details_id || "";
      state.info = action.payload.info || [];
      state.specification = action.payload.specification || [];
    },

    resetDetails: (state, action) => {
      state.info = [];
      state.specification = [];
      state.details_id = "";
    },
  },
});

export default detailsSlice.reducer;

export const {
  addSpecification,
  resetDetails,
  addInfo,
  deleteItem,
  editItem,
  loadDetails,
} = detailsSlice.actions;

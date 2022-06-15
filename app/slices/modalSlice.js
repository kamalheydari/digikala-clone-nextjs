import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  type: "",
  title: "",
  text: "",
  status: "",
};

const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    closeModal: (state, action) => {
      state.isShow = false;
      // state.type = "";
      // state.text = "";
      // state.title = "";
      // state.status = "";
    },
    openModal: (state, action) => {
      state.isShow = true;
      state.type = action.payload.type;
      state.text = action.payload.text;
      state.title = action.payload.title;
      state.status = action.payload.status;
    },
  },
});

export const { closeModal, openModal } = modalSlice.actions;

export default modalSlice.reducer;

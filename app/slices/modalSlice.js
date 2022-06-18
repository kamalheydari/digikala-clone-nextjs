import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  isConfirm: false,
  id: null,
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
    },
    openModal: (state, action) => {
      state.isShow = true;
      state.type = action.payload.type || "";
      state.id = action.payload.id || null;
      state.text = action.payload.text || "";
      state.title = action.payload.title || "";
      state.status = action.payload.status || "";
    },
    confirmAction: (state, action) => {
      console.log(state.id);
      state.isConfirm = true;
    },
    confirmReset: (state, action) => {
      state.isConfirm = false;
      state.id = null;
    },
  },
});

export const {
  closeModal,
  openModal,
  confirmAction,
  confirmReset,
} = modalSlice.actions;

export default modalSlice.reducer;

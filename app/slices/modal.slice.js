import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  isConfirm: false,
  id: null,
  editedData: null,
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
      state.type = "";
    },
    openModal: (state, action) => {
      state.isShow = true;
      state.type = action.payload.type || "";
      state.id = action.payload.id || null;
      state.editedData = action.payload.editedData || null;
      state.text = action.payload.text || "";
      state.title = action.payload.title || "";
      state.status = action.payload.status || "";
      state.isConfirm = action.payload.isConfirm || false;
    },
    confirmAction: (state, action) => {
      state.isConfirm = true;
    },
    confirmReset: (state, action) => {
      state.isConfirm = false;
      state.id = null;
      state.editedData = null;
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

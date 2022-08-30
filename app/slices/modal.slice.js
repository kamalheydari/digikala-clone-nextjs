import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isShow: false,
  isConfirmDelete: false,
  isConfirmUpdate: false,
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
    confirmDeleteAction: (state, action) => {
      state.isConfirmDelete = true;
    },
    confirmUpdateAction: (state, action) => {
      state.isConfirmUpdate = true;
    },
    confirmReset: (state, action) => {
      state.isConfirmDelete = false;
      state.isConfirmUpdate = false;
      state.id = null;
      state.editedData = null;
      state.title = "";
    },
  },
});

export const {
  closeModal,
  openModal,
  confirmDeleteAction,
  confirmUpdateAction,
  confirmReset,
} = modalSlice.actions;

export default modalSlice.reducer;

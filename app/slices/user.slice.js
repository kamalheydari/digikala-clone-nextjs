import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import exsitItem from "utils/exsitItem";

const lastSeen =
  typeof window !== "undefined" && localStorage.getItem("lastSeen")
    ? JSON.parse(localStorage.getItem("lastSeen"))
    : [];

const token = Cookies.get("token") || "";

const initialState = { userInfo: null, lastSeen, token };

export const fetchUser = createAsyncThunk("user/fetchUser", async () => {
  const res = await fetch("/api/auth/user", {
    headers: { Authorization: token },
  });
  const data = await res.json();

  return data?.user;
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogout: (state) => {
      Cookies.remove("token");
      state.token = "";
      state.userInfo = null;
    },

    updateUser: (state, action) => {
      state.userInfo = action.payload;
    },
    addToLastSeen: (state, action) => {
      let isItemExist = exsitItem(state.lastSeen, action.payload.productID);

      if (!isItemExist) {
        if (state.lastSeen.length === 15) {
          state.lastSeen.splice(14, 1);
        }
        state.lastSeen.unshift(action.payload);
        localStorage.setItem("lastSeen", JSON.stringify(state.lastSeen));
      }
    },
  },
  extraReducers(builder) {
    builder.addCase(fetchUser.fulfilled, (state, action) => {
      state.userInfo = action.payload;
    });
  },
});

export const { userLogout, updateUser, addToLastSeen } = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";
import exsitItem from "utils/exsitItem";

const userInfo = Cookies.get("userInfo")
  ? JSON.parse(Cookies.get("userInfo"))
  : { token: null, user: null };

const lastSeen =
  typeof window !== "undefined" && localStorage.getItem("lastSeen")
    ? JSON.parse(localStorage.getItem("lastSeen"))
    : [];

const initialState = { ...userInfo, lastSeen };

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    userLogin: (state, action) => {
      const { user, access_token: token } = action.payload;

      state.token = token;
      state.user = user;
      Cookies.set("userInfo", JSON.stringify({ token, user }), { expires: 10 });
    },

    userLogout: (state) => {
      Cookies.remove("userInfo");
      Cookies.remove("refreshToken");

      state.token = null;
      state.user = null;
    },

    updateUser: (state, action) => {
      state.user = action.payload;
      Cookies.set(
        "userInfo",
        JSON.stringify({ token: state.token, user: action.payload }),
        { expires: 10 }
      );
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
});

export const {
  userLogin,
  userLogout,
  updateUser,
  addToLastSeen,
} = userSlice.actions;

export default userSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import Cookies from "js-cookie";

const initialState = Cookies.get("userInfo")
  ? JSON.parse(Cookies.get("userInfo"))
  : { token: null, user: null };

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
  },
});

export const { userLogin, userLogout, updateUser } = userSlice.actions;

export default userSlice.reducer;

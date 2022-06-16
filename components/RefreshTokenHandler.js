import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "app/slices/authSlice";

import verifyToken from "utils/verifyToken";

import { openModal } from "app/slices/modalSlice";

export default function RefreshTokenHandler() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  //? handle exp token
  const isverify = verifyToken(token);

  if (!isverify && token) {
    dispatch(userLogout());
    dispatch(
      openModal({
        isShow: true,
        type: "redirect",
        text: "توکن احراز هویت نادرست است یا منقضی شده است",
        title: "",
      })
    );
  }

  return null;
}

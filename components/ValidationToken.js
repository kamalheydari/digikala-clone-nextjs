import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "app/slices/user.slice";

import verifyToken from "utils/verifyToken";

import { openModal } from "app/slices/modal.slice";

export default function ValidationToken() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

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

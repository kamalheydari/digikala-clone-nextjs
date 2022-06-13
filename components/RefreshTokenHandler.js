import { useRouter } from "next/router";

import { useDispatch, useSelector } from "react-redux";
import { userLogout } from "app/slices/authSlice";

import verifyToken from "utils/verifyToken";

import { confirmAlert } from "utils/alert";

export default function RefreshTokenHandler() {
  const dispatch = useDispatch();
  const router = useRouter();

  const { token } = useSelector((state) => state.auth);

  //? handle exp token
  const isverify = verifyToken(token);

  if (!isverify && token) {
    dispatch(userLogout());
    confirmAlert({
      text: "توکن احراز هویت نادرست است یا منقضی شده است",
      title: "",
      icon: "warning",
      confirmButtonText: "انقال به صفحه ورود",
    }).then((result) => {
      if (result.isConfirmed) router.push("/login");
    });
  }

  return null;
}

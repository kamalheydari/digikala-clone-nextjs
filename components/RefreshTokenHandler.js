import { useRouter } from "next/router";
import { useEffect } from "react";

import Cookies from "js-cookie";

import { userLogin, userLogout } from "app/slices/authSlice";
import { useGetDataQuery } from "app/slices/fetchApiSlice";
import { useDispatch } from "react-redux";

import { confirmAlert } from "utils/alert";

export default function RefreshTokenHandler() {
  const dispatch = useDispatch();
  const router = useRouter();

  const refreshToken = Cookies.get("refreshToken");

  if (refreshToken) {
    const { data, isSuccess, isError } = useGetDataQuery({
      url: "/api/auth/access-token",
      token: "",
    });

    useEffect(() => {
      if (isSuccess) dispatch(userLogin(data));
      if (isError) {
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
    }, [isSuccess, isError]);
  }

  return null;
}

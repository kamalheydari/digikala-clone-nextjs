import { useEffect } from "react";

import { userLogin } from "app/slices/authSlice";
import { useGetDataQuery } from "app/slices/fetchApiSlice";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";

export default function RefreshTokenHandler() {
  const dispatch = useDispatch();

  const refreshToken = Cookies.get("refreshToken");

  if (refreshToken) {
    const { data, isSuccess, isLoading, isError, error } = useGetDataQuery({
      url: "/api/auth/access-token",
      token: "",
    });
    
    useEffect(() => {
      if (isSuccess) dispatch(userLogin(data));
    }, [isSuccess, isError]);
  }

  return null;
}

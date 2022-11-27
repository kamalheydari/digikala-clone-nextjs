import { useGetUserInfoQuery } from "app/api/userApi";
import useVerify from "./useVerify";

export default function useUserInfo() {
  const isVerify = useVerify();

  const { data, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !isVerify,
  });

  return { userInfo: data?.user, isVerify, isLoading };
}

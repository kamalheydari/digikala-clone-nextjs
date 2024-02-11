import { useGetUserInfoQuery } from '@/services'

export default function useUserInfo() {
  const { userInfo, isLoading, isError, error, isSuccess } = useGetUserInfoQuery(undefined, {
    selectFromResult: ({ data, isLoading, isError, error, isSuccess }) => {
      if (isError) return { userInfo: undefined, isLoading, isError, error, isSuccess }
      else return { userInfo: data, isLoading, isError, error, isSuccess }
    },
  })

  return { userInfo, isLoading, isError, error, isSuccess }
}

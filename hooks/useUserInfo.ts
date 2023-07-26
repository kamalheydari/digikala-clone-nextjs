import { useGetUserInfoQuery } from 'services'
import { useVerify } from 'hooks'

export default function useUserInfo() {
  const isVerify = useVerify()

  const { data, isLoading } = useGetUserInfoQuery(undefined, {
    skip: !isVerify,
  })

  return { userInfo: data?.user, isVerify, isLoading }
}

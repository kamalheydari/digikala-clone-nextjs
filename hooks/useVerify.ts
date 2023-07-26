import jwt, { Secret } from 'jsonwebtoken'

import { useAppSelector } from 'hooks'

export default function useVerify() {
  const { token } = useAppSelector((state) => state.user)
  let status

  if (!token) return false

  jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as Secret,
    (err, decoded) => {
      if (err) status = false
      if (decoded) status = true
    }
  )

  if (status) return true
  else return false
}

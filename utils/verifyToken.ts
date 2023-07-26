import jwt, { Secret, decode } from 'jsonwebtoken'

export default function verifyToken(token: string) {
  let status = true
  jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_SECRET as Secret,
    (err, decoded) => {
      if (err) status = false
    }
  )
  return status
}

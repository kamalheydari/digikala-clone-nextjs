import jwt from 'jsonwebtoken'

export default function createAccessToken(payload) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '10d',
  })
}

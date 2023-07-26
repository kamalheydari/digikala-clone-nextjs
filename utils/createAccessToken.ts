import jwt, { Secret } from 'jsonwebtoken'

import { ObjectId } from 'mongoose'

export default function createAccessToken(payload: { id: ObjectId | string }) {
  return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET as Secret, {
    expiresIn: '10d',
  })
}

import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

import config from 'config'

import type { ObjectId } from 'mongoose'

// Sign Token
export const signToken = async (id: ObjectId | string) =>
  jwt.sign({ id }, process.env.JWT_SECRET_KEY!, {
    expiresIn: `${config.accessTokenExpiresIn}d`,
  })

export const verifyToken = (token: string, secretKey: Secret) =>
  jwt.verify(token, secretKey) as JwtPayload

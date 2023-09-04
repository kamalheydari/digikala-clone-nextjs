import { SignJWT, jwtVerify } from 'jose'
import { nanoid } from '@reduxjs/toolkit'
import { serialize } from 'cookie'

import type { ObjectId } from 'mongoose'
import type { DataModels } from 'types'
import type { NextRequest, NextResponse } from 'next/server'

type TokenPayload = {
  id: ObjectId | string
  role: DataModels.IUser['role']
}

interface UserJwtPayload extends TokenPayload {
  jti: string
  iat: number
}

export const userToken = 'user-token'

export class AuthError extends Error {}

export function getJwtSecretKey(): string {
  const JwtSecretKey: string | undefined = process.env.JWT_SECRET_KEY!

  if (!JwtSecretKey || JwtSecretKey.length === 0) {
    throw new Error('The environment variable JWT_SECRET_KEY is not set.')
  }

  return JwtSecretKey
}

export async function verifyAuth(token: string) {
  if (!token) throw new AuthError('missing user token')
  try {
    const verified = await jwtVerify(
      token,
      new TextEncoder().encode(getJwtSecretKey())
    )
    return verified.payload as unknown as UserJwtPayload
  } catch (err) {
    throw new AuthError('your token has expired.')
  }
}

export async function setUserCookie(payload: TokenPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setJti(nanoid())
    .setIssuedAt()
    .setExpirationTime('10d')
    .sign(new TextEncoder().encode(getJwtSecretKey()))

  const serialisedToken = serialize(userToken, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== 'development',
    maxAge: 60 * 60 * 24 * 10, // 10 Days
    sameSite: 'strict',
    path: '/',
  })

  return serialisedToken
}

// export function expireUserCookie(res: NextResponse) {
//   res.cookies.set(userToken, '', { httpOnly: true, maxAge: 0 })
//   return res
// }

import config from 'config'
import { tokens } from './constatns'
import { serialize } from 'cookie'

//? Cookie options
const accessTokenCookieOptions = {
  expires: new Date(Date.now() + config.accessTokenExpiresIn * 60 * 60 * 24),
  maxAge: config.accessTokenExpiresIn * 60 * 60 * 24,
  secure: process.env.NODE_ENV !== 'development',
  httpOnly: true,
  path: '/',
}

const loggedInCookieOptions = {
  ...accessTokenCookieOptions,
  httpOnly: false,
}

export const destroyAccessToken = serialize(tokens.ACCESS_TOKEN, '', {
  httpOnly: true,
  secure: process.env.NODE_ENV !== 'development',
  expires: new Date(0),
  path: '/',
  sameSite: 'strict',
})

export const destroyLoggedIn = serialize(tokens.LOGGED_IN, '', {
  httpOnly: false,
  secure: process.env.NODE_ENV !== 'development',
  expires: new Date(0),
  path: '/',
  sameSite: 'strict',
})

export const serializeAccessTokenCookie = (value: string) =>
  serialize(tokens.ACCESS_TOKEN, value, accessTokenCookieOptions)

export const serializeLoggedInCookie = (value: string) =>
  serialize(tokens.LOGGED_IN, value, loggedInCookieOptions)

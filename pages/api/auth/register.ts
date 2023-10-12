import bcrypt from 'bcrypt'

import { User } from 'models'

import {
  sendError,
  db,
  signToken,
  serializeAccessTokenCookie,
  serializeLoggedInCookie,
} from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { IUserDocument } from 'types'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      await register(req, res)
      break

    default:
      break
  }
}

const register = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect()
    const { name, email, password } = req.body

    const user: IUserDocument | null = await User.findOne({ email })

    if (user)
      return sendError(res, 422, 'شما قبلا با این آدرس ایمیل ثیت نام کردید')

    const hashPassword = await bcrypt.hash(password, 12)

    const newUser = new User({ name, email, password: hashPassword })

    await newUser.save()

    const access_token = await signToken(newUser._id)

    const accessTokenCookie = serializeAccessTokenCookie(access_token)
    const loggedInTokenCookie = serializeLoggedInCookie('true')

    res.setHeader('Set-Cookie', [accessTokenCookie, loggedInTokenCookie])

    res.status(201).json({
      msg: 'عضویت موفقیت آمیز بود',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

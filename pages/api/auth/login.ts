import bcrypt from 'bcrypt'

import { User } from 'models'

import {
  signToken,
  sendError,
  db,
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
      try {
        const { email, password } = req.body

        await db.connect()

        const user: IUserDocument | null = await User.findOne({
          email,
        })

        if (!user) return sendError(res, 404, 'کاربری با این ایمیل یافت نشد')

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
          return sendError(res, 422, 'آدرس ایمیل یا کلمه عبور اشتباه است')

        const access_token = await signToken(user._id)

        const accessTokenCookie = serializeAccessTokenCookie(access_token)
        const loggedInTokenCookie = serializeLoggedInCookie('true')

        res.setHeader('Set-Cookie', [accessTokenCookie, loggedInTokenCookie])

        res.status(200).json({
          msg: 'ورود موفقیت آمیز بود',
        })
      } catch (error) {
        sendError(res, 500, (error as Error).message)
      }
      break

    default:
      break
  }
}

export default handler

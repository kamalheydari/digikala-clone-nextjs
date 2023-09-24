import { User } from 'models'

import type { NextApiResponse } from 'next'
import type { NextApiRequestWithUser } from 'types'

import { db, sendError, tokens, verifyToken } from 'utils'

export default function withUser(handler: any) {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    const accessToken = req.cookies[tokens.ACCESS_TOKEN]

    if (accessToken) {
      try {
        const verifiedToken = verifyToken(
          accessToken,
          process.env.JWT_SECRET_KEY!
        )

        const userId = verifiedToken?.id

        await db.connect()

        const user = await User.findById({
          _id: userId,
        }).select('-password')

        if (!user) return sendError(res, 401, 'کاربر وجود ندارد')

        req.user = user
      } catch (error) {
        sendError(res, 500, (error as Error).message)
      }
    }
    return handler(req, res)
  }
}

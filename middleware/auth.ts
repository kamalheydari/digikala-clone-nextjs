import jwt, { JwtPayload, Secret } from 'jsonwebtoken'

import { User } from 'models'

import { db, sendError } from 'utils'

import { NextApiRequest, NextApiResponse } from 'next'

export default async function auth(req: NextApiRequest, res: NextApiResponse) {
  const token = req.headers.authorization

  if (!token) return sendError(res, 403, 'توکن احراز هویت نامعتبر است')

  try {
    const decoded = jwt.verify(
      token,
      process.env.ACCESS_TOKEN_SECRET as Secret
    ) as JwtPayload

    await db.connect()
    const user = await User.findOne({ _id: decoded.id })
    await db.disconnect()

    if (user) return { id: user._id, role: user.role, root: user.root }
  } catch (error) {
    sendError(res, 403, 'توکن احراز هویت نامعتبر است')
  }
}

import jwt from 'jsonwebtoken'

import { User } from 'models'

import { db, sendError } from 'utils'

export default async function auth(req, res) {
  const token = req.headers.authorization

  if (!token) sendError(res, 403, 'توکن احراز هویت نامعتبر است')

  const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

  if (!decoded) sendError(res, 403, 'توکن احراز هویت نامعتبر است')

  await db.connect()
  const user = await User.findOne({ _id: decoded.id })
  await db.disconnect()

  return { id: user._id, role: user.role, root: user.root }
}

import bcrypt from 'bcrypt'

import { User } from 'models'

import { createAccessToken, sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels } from 'types'

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

    const user: DataModels.IUserDocument | null = await User.findOne({ email })

    if (user)
      return sendError(res, 422, 'شما قبلا با این آدرس ایمیل ثیت نام کردید')

    const hashPassword = await bcrypt.hash(password, 12)

    const newUser = new User({ name, email, password: hashPassword })

    await newUser.save()
    await db.disconnect()

    const access_token = createAccessToken({ id: newUser._id })

    res.status(201).json({
      msg: 'عضویت موفقیت آمیز بود',
      data: {
        access_token,
      },
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

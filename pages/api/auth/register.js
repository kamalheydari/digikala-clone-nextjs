import bcrypt from 'bcrypt'

import { User } from 'models'

import { createAccessToken, sendError, db } from 'utils'

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await register(req, res)
      break

    default:
      break
  }
}

const register = async (req, res) => {
  try {
    await db.connect()
    const { name, email, password } = req.body

    const user = await User.findOne({ email })

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
    sendError(res, 500, error.message)
  }
}

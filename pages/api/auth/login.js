import bcrypt from 'bcrypt'

import { User } from 'models'

import { createAccessToken, sendError, db } from 'utils'

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      try {
        const { email, password } = req.body

        await db.connect()

        const user = await User.findOne({ email })

        if (!user) return sendError(res, 404, 'کاربری با این ایمیل یافت نشد')

        const isMatch = await bcrypt.compare(password, user.password)

        if (!isMatch)
          return sendError(res, 422, 'آدرس ایمیل یا کلمه عبور اشتباه است')

        const access_token = createAccessToken({ id: user._id })

        await db.disconnect()

        res.status(200).json({
          msg: 'ورود موفقیت آمیز بود',
          data: {
            access_token,
            root: user.root,
            role: user.role,
          },
        })
      } catch (error) {
        sendError(res, 500, error.message)
      }
      break

    default:
      break
  }
}

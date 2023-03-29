import { Banner } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      await createBanner(req, res)
      break

    default:
      break
  }
}

const createBanner = async (req, res) => {
  try {
    const result = await auth(req, res)

    if (!result.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()
    const newBanner = new Banner({ ...req.body })
    await newBanner.save()
    await db.disconnect()

    res.status(201).json({ msg: 'ساخت بنر جدید موفقیت آمیز بود' })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

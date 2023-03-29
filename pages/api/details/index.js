import { Details } from 'models'

import auth from 'middleware/auth'
import { sendError, db } from 'utils'

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      await createDetails(req, res)
      break

    default:
      break
  }
}

const createDetails = async (req, res) => {
  try {
    const result = await auth(req, res)

    if (!result.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')
    await db.connect()
    const newDetails = new Details({ ...req.body })
    await newDetails.save()
    await db.disconnect()

    res
      .status(201)
      .json({ msg: 'ساخت جدول جزییات جدید موفقیت آمیز بود', newDetails })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

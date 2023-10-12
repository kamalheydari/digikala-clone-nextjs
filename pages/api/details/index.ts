import { Details } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await createDetails(req, res)
      break

    default:
      break
  }
}

const createDetails = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()
    const newDetails = new Details({ ...req.body })
    await newDetails.save()

    res.status(201).json({ msg: 'ساخت جدول جزییات جدید موفقیت آمیز بود' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

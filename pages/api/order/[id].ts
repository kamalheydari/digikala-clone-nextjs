import { Order } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { IOrderDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getOrder(req, res)
      break

    case 'PATCH':
      await updateOrder(req, res)
      break

    default:
      break
  }
}

const getOrder = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    await db.connect()
    const order: IOrderDocument | null = await Order.findOne({
      _id: req.query.id,
    })

    if (!order) return sendError(res, 404, 'این سفارش وجود ندارد')

    if (order) res.status(200).json({ order })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateOrder = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()
    await Order.findOneAndUpdate(
      { _id: req.query.id },
      {
        ...req.body,
      }
    )

    res.status(200).json({
      msg: 'وضعیت سفارش بروزرسانی شد',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

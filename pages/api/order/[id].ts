import auth from 'middleware/auth'

import { Order } from 'models'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels } from 'types'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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

const getOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect()
    const order: DataModels.IOrderDocument | null = await Order.findOne({
      _id: req.query.id,
    })

    if (!order) return sendError(res, 404, 'این سفارش وجود ندارد')

    await db.disconnect()

    if (order) res.status(200).json({ order })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()
    await Order.findOneAndUpdate(
      { _id: req.query.id },
      {
        ...req.body,
      }
    )
    await db.disconnect()

    res.status(200).json({
      msg: 'وضعیت سفارش بروزرسانی شد',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

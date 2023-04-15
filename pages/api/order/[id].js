import auth from 'middleware/auth'
import { Order } from 'models'

import { sendError, db } from 'utils'

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      getOrder(req, res)
      break
    case 'PATCH':
      await updateOrder(req, res)
    default:
      break
  }
}

const getOrder = async (req, res) => {
  try {
    await db.connect()
    const order = await Order.findOne({ _id: req.query.id })

    if (!order) return sendError(res, 404, 'این سفارش وجود ندارد')

    await db.disconnect()

    res.status(200).json({ order })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

const updateOrder = async (req, res) => {
  try {
    const result = await auth(req, res)

    if (!result.root)
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
    sendError(res, 500, error.message)
  }
}

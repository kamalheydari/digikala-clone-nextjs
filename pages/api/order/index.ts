import { Product, Order } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels, ICart, IPagination } from 'types'
import { ObjectId } from 'mongoose'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      await createOrder(req, res)
      break

    case 'GET':
      await getOrders(req, res)
      break

    default:
      break
  }
}

const getOrders = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query.page ? +req.query.page : 1
  const page_size = req.query.page_size ? +req.query.page_size : 10

  try {
    const result = await auth(req, res)

    let orders: DataModels.IOrderDocument[], ordersLength: number

    await db.connect()
    if (!result?.root) {
      orders = await Order.find({ user: result?.id })
        .populate('user', '-password -address')
        .skip((page - 1) * page_size)
        .limit(page_size)
        .sort({
          createdAt: 'desc',
        })

      ordersLength = await Order.countDocuments({ user: result?.id })
    } else {
      orders = await Order.find()
        .populate('user', '-password -address')
        .skip((page - 1) * page_size)
        .limit(page_size)
        .sort({
          createdAt: 'desc',
        })

      ordersLength = await Order.countDocuments()
    }
    await db.disconnect()

    res.status(200).json({
      orders,
      ordersLength,
      pagination: {
        currentPage: page,
        nextPage: page + 1,
        previousPage: page - 1,
        hasNextPage: page_size * page < ordersLength,
        hasPreviousPage: page > 1,
        lastPage: Math.ceil(ordersLength / page_size),
      },
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const createOrder = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)
    const { cart } = req.body

    await db.connect()
    const newOrder = new Order({
      user: result?.id,
      ...req.body,
    })

    //? update product beside on new order
    cart.forEach((item: ICart) =>
      sold(item.productID, item.quantity, item.inStock, item.sold)
    )

    await newOrder.save()
    await db.disconnect()

    res.status(200).json({ msg: 'سفاش شما ثبت شد ' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const sold = async (
  _id: ObjectId | string,
  quantity: number,
  oldStock: number,
  oldSold: number
): Promise<void> => {
  await Product.findOneAndUpdate(
    { _id },
    {
      inStock: oldStock - quantity,
      sold: quantity + oldSold,
    }
  )
}

export default handler

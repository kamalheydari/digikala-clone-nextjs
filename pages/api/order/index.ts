import { Product, Order } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { ICart, IOrderDocument } from 'types'
import type { ObjectId } from 'mongoose'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
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

const getOrders = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  const page = req.query.page ? +req.query.page : 1
  const page_size = req.query.page_size ? +req.query.page_size : 10

  try {
    const userRole = req.user.role
    const userId = req.user._id

    let orders: IOrderDocument[], ordersLength: number

    await db.connect()
    if (userRole === roles.USER) {
      orders = await Order.find({ user: userId })
        .populate('user', '-password -address')
        .skip((page - 1) * page_size)
        .limit(page_size)
        .sort({
          createdAt: 'desc',
        })

      ordersLength = await Order.countDocuments({ user: userId })
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

const createOrder = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const userId = req.user._id

    const { cart } = req.body

    await db.connect()
    const newOrder = new Order({
      user: userId,
      ...req.body,
    })

    //? update product beside on new order
    cart.forEach((item: ICart) =>
      sold(item.productID, item.quantity, item.inStock, item.sold)
    )

    await newOrder.save()

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

export default withUser(handler)

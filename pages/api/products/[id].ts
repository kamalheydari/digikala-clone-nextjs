import { Product } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { IProductDocument } from 'types'
import type { NextApiResponse } from 'next'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getProduct(req, res)
      break

    case 'PUT':
      await updateProduct(req, res)
      break

    case 'DELETE':
      await deleteProduct(req, res)
      break

    default:
      break
  }
}

const getProduct = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query

    await db.connect()

    const product: IProductDocument | null = await Product.findById(id)
      .populate('category_levels.level_one')
      .populate('category_levels.level_two')
      .populate('category_levels.Level_three')

    if (!product) return sendError(res, 404, 'این محصول موجود نمیباشد')

    res.status(200).json(product)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateProduct = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Product.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    )

    res.status(200).json({ msg: 'اطلاعات محصول با موفقیت بروزرسانی شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const deleteProduct = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Product.findByIdAndDelete(id)

    res.status(200).json({ msg: 'محصول با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

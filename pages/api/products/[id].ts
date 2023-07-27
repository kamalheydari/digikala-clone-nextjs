import { Product } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

import type { DataModels } from 'types'
import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query

    await db.connect()

    const product: DataModels.IProductDocument | null = await Product.findById(
      id
    )
      .populate('category_levels.level_one')
      .populate('category_levels.level_two')
      .populate('category_levels.Level_three')

    await db.disconnect()

    if (!product) return sendError(res, 404, 'این محصول موجود نمیباشد')

    res.status(200).json({ product })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    const { title, price, images, category, info, specification } = req.body

    if (
      !title ||
      !price ||
      !category ||
      images.length === 0 ||
      info.length === 0 ||
      specification.length === 0
    )
      return sendError(res, 204, 'لطفا تمام فیلد ها را پر کنید')

    await db.connect()
    await Product.findByIdAndUpdate(
      { _id: id },
      {
        ...req.body,
      }
    )
    await db.disconnect()

    res.status(200).json({ msg: 'اطلاعات محصول با موفقیت بروزرسانی شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const deleteProduct = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Product.findByIdAndDelete(id)
    await db.disconnect()

    res.status(200).json({ msg: 'محصول با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

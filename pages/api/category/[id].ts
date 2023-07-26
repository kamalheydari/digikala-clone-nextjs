import { Category } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels } from 'types'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'GET':
      await getCategory(req, res)
      break

    case 'PUT':
      await updateCategory(req, res)
      break

    default:
      break
  }
}

const getCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    await db.connect()
    const category: DataModels.ICategoryDocument | null =
      await Category.findById(id)
    await db.disconnect()

    if (category) res.status(200).json(category)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)
    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Category.findByIdAndUpdate({ _id: id }, { ...req.body })
    await db.disconnect()

    res.status(200).json({ msg: 'مشخصات دسته بندی با موفقیت بروزرسانی شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

import { Category } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { ICategoryDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
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

const getCategory = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query
    await db.connect()
    const category: ICategoryDocument | null = await Category.findById(id)

    if (category) res.status(200).json(category)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateCategory = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Category.findByIdAndUpdate({ _id: id }, { ...req.body })

    res.status(200).json({ msg: 'مشخصات دسته بندی با موفقیت بروزرسانی شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

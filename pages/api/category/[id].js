import { Category } from 'models'

import auth from 'middleware/auth'
import { sendError, db } from 'utils'

export default async function (req, res) {
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

const getCategory = async (req, res) => {
  try {
    const { id } = req.query
    await db.connect()
    const category = await Category.findById(id)
    await db.disconnect()

    res.status(200).json(category)
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

const updateCategory = async (req, res) => {
  try {
    const result = await auth(req, res)
    if (!result.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Category.findByIdAndUpdate({ _id: id }, { ...req.body })
    await db.disconnect()

    res.status(200).json({ msg: 'مشخصات دسته بندی با موفقیت بروزرسانی شد' })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

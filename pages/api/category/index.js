import Category from 'models/Category'

import auth from 'middleware/auth'
import { sendError, db } from 'utils'

export default async (req, res) => {
  switch (req.method) {
    case 'POST':
      await createCategory(req, res)
      break

    case 'GET':
      await getCategories(req, res)
      break

    default:
      break
  }
}

const createCategory = async (req, res) => {
  try {
    const result = await auth(req, res)

    if (!result.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()
    let newCategory
    if (req.body.parent)
      newCategory = new Category({
        ...req.body,
      })
    else
      newCategory = new Category({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        colors: req.body.colors,
        level: req.body.level,
      })
    await newCategory.save()
    await db.disconnect()

    res
      .status(201)
      .json({ msg: 'ساخت دسته بندی جدید موفقیت آمیز بود', newCategory })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

const getCategories = async (req, res) => {
  try {
    await db.connect()
    const categories = await Category.find()
    await db.disconnect()

    res.status(200).json({ categories })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

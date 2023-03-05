import db from 'lib/db'
import Products from 'models/Product'

import sendError from 'utils/sendError'
import auth from 'middleware/auth'

export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getProducts(req, res)
      break

    case 'POST':
      await createProduct(req, res)
      break

    default:
      break
  }
}

const getProducts = async (req, res) => {
  const page = +req.query.page || 1
  const page_size = +req.query.page_size || 10
  const { category, search } = req.query

  //? Filters
  const categoryFilter =
    category && category !== 'all'
      ? {
          category: {
            $regex: category,
            $options: 'i',
          },
        }
      : {}

  const searchFilter =
    search && search !== 'all'
      ? {
          title: {
            $regex: search,
            $options: 'i',
          },
        }
      : {}

  try {
    await db.connect()

    const products = await Products.find({ ...categoryFilter, ...searchFilter })
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        createdAt: 'desc',
      })

    const productsLength = await Products.countDocuments({
      ...categoryFilter,
      ...searchFilter,
    })

    await db.disconnect()

    res.status(200).json({
      productsLength,
      products,
      currentPage: page,
      nextPage: page + 1,
      previousPage: page - 1,
      hasNextPage: page_size * page < productsLength,
      hasPreviousPage: page > 1,
      lastPage: Math.ceil(productsLength / page_size),
    })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

const createProduct = async (req, res) => {
  try {
    const result = await auth(req, res)

    if (!result.root) return sendError(res, 403, 'توکن احراز هویت نامعتبر است')

    const {
      title,
      price,
      discount,
      description,
      images,
      sizes,
      colors,
      category,
      inStock,
      info,
      specification,
    } = req.body

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
    const newProduct = new Products({
      title,
      price,
      discount,
      description,
      images,
      sizes,
      colors,
      category,
      inStock,
      info,
      specification,
    })
    await newProduct.save()
    await db.disconnect()

    res.status(201).json({ msg: 'محصول جدید با موفقیت اضافه شد' })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

import { Category, Product } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

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
  const search = req.query.search
  const category = req.query.category
  const sort = +req.query.sort || 1
  const inStock = req.query.inStock || null
  const discount = req.query.discount || null
  const price = req.query.price

  try {
    await db.connect()

    //? Filters

    const currentCategory = await Category.findOne({ slug: category })

    const categoryFilter = currentCategory
      ? {
          category: { $in: currentCategory._id.toString() },
        }
      : {}

    const searchFilter = search
      ? {
          title: {
            $regex: search,
            $options: 'i',
          },
        }
      : {}

    const inStockFilter = inStock === 'true' ? { inStock: { $gte: 1 } } : {}

    const discountFilter =
      discount === 'true' ? { discount: { $gte: 1 }, inStock: { $gte: 1 } } : {}

    const priceFilter = price
      ? {
          price: {
            $gte: +price.split('-')[0],
            $lte: +price.split('-')[1],
          },
        }
      : {}

    //? Sort
    const order =
      sort === 3
        ? { price: 1 }
        : sort === 4
        ? { price: -1 }
        : sort === 2
        ? { sold: -1 }
        : sort === 1
        ? { createdAt: -1 }
        : sort === 5
        ? { rating: -1 }
        : sort === 6
        ? { discount: -1 }
        : { _id: -1 }

    const products = await Product.find({
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
      ...priceFilter,
      ...searchFilter,
    })
      .select(
        '-description -info -specification -category -category_levels -sizes  -reviews -numReviews'
      )
      .sort(order)
      .skip((page - 1) * page_size)
      .limit(page_size)

    const productsLength = await Product.countDocuments({
      ...categoryFilter,
      ...inStockFilter,
      ...discountFilter,
      ...priceFilter,
      ...searchFilter,
    })

    const mainMaxPrice = Math.max(
      ...(await Product.find({
        ...categoryFilter,
        inStock: { $gte: 1 },
      }).distinct('price'))
    )
    const mainMinPrice = Math.min(
      ...(await Product.find({
        ...categoryFilter,
        inStock: { $gte: 1 },
      }).distinct('price'))
    )

    await db.disconnect()

    res.status(200).json({
      productsLength,
      products,
      mainMaxPrice,
      mainMinPrice,
      pagination: {
        currentPage: page,
        nextPage: page + 1,
        previousPage: page - 1,
        hasNextPage: page_size * page < productsLength,
        hasPreviousPage: page > 1,
        lastPage: Math.ceil(productsLength / page_size),
      },
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
      category_levels,
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
    const newProduct = new Product({
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
      category_levels,
    })
    await newProduct.save()
    await db.disconnect()

    res.status(201).json({ msg: 'محصول جدید با موفقیت اضافه شد' })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

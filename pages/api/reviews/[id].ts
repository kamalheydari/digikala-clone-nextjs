import { Review, Product } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels } from 'types'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      await createReview(req, res)
      break
    case 'GET':
      await getReview(req, res)
      break
    case 'DELETE':
      await deleteReview(req, res)
      break
    case 'PATCH':
      await updateReview(req, res)
      break

    default:
      break
  }
}

const createReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    await db.connect()

    const newReview = new Review({
      user: result?.id,
      product: req.query.id,
      ...req.body,
    })

    await newReview.save()
    await db.disconnect()

    res.status(201).json({
      msg: 'نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const getReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect()

    const review: DataModels.IReviewDocument | null = await Review.findOne({
      _id: req.query.id,
    })
      .populate('product', 'images')
      .populate('user', 'name')

    if (!review) return sendError(res, 404, 'این نظر وجود ندارد')

    await db.disconnect()

    res.status(200).json({ review })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const deleteReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    await db.connect()

    const review: DataModels.IReviewDocument | null = await Review.findOne({
      user: result?.id,
    })

    if (review?.user.toString() !== result?.id.toString())
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await Review.findByIdAndDelete(req.query.id)

    await db.disconnect()

    res.status(200).json({ msg: 'دیدگاه با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateReview = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)
    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()

    const review: DataModels.IReviewDocument | null =
      await Review.findOneAndUpdate({ _id: req.query.id }, { ...req.body })

    const product: DataModels.IProductDocument | null = await Product.findOne({
      _id: review?.product,
    })
    const reviews: DataModels.IReviewDocument[] | null = await Review.find({
      product: product?._id,
    })

    if (product) {
      let { totalRating, totalReviews } = reviews.reduce(
        (total, item) => {
          if (item.status === 2) {
            total.totalRating += item.rating
            total.totalReviews += 1
          }
          return total
        },
        { totalRating: 0, totalReviews: 0 }
      )

      product.numReviews = totalReviews
      product.rating = totalRating / totalReviews
      await product.save()
    }

    await db.disconnect()

    res.status(201).json({
      msg: 'وضعیت دیدگاه با موفقیت به روز رسانی شد',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

import { Review, Product } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { IReviewDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
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

const createReview = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const userId = req.user._id

    await db.connect()

    const newReview = new Review({
      user: userId,
      product: req.query.id,
      ...req.body,
    })

    await newReview.save()

    res.status(201).json({
      msg: 'نظر شما با موفقیت ثبت شد و پس از تایید نمایش داده میشود',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const getReview = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    await db.connect()

    const review: IReviewDocument | null = await Review.findOne({
      _id: req.query.id,
    })
      .populate('product', 'images')
      .populate('user', 'name')

    if (!review) return sendError(res, 404, 'این نظر وجود ندارد')

    res.status(200).json({ review })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const deleteReview = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const userId = req.user._id

    await db.connect()

    const review: IReviewDocument | null = await Review.findOne({
      user: userId,
    })

    if (review?.user !== userId)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await Review.findByIdAndDelete(req.query.id)

    res.status(200).json({ msg: 'دیدگاه با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateReview = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()

    const review: IReviewDocument | null = await Review.findOneAndUpdate(
      { _id: req.query.id },
      { ...req.body }
    )

    const product = await Product.findOne({
      _id: review?.product,
    })
    const reviews: IReviewDocument[] | null = await Review.find({
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

    res.status(201).json({
      msg: 'وضعیت دیدگاه با موفقیت به روز رسانی شد',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

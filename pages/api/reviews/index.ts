import { Review } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { IReviewDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      getReviews(req, res)
      break

    default:
      break
  }
}

const getReviews = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  const page = req.query.page ? +req.query.page : 1
  const page_size = req.query.page_size ? +req.query.page_size : 5

  try {
    const userRole = req.user.role
    const userId = req.user._id

    let reviews: IReviewDocument[], reviewsLength: number

    await db.connect()

    if (userRole === roles.USER) {
      reviews = await Review.find({ user: userId })
        .populate('product', 'images')
        .populate('user', 'name')
        .skip((page - 1) * page_size)
        .limit(page_size)
        .sort({
          createdAt: 'desc',
        })

      reviewsLength = await Review.countDocuments({ user: userId })
    } else {
      reviews = await Review.find()
        .populate('product', 'images')
        .populate('user', 'name')
        .skip((page - 1) * page_size)
        .limit(page_size)
        .sort({
          createdAt: 'desc',
        })

      reviewsLength = await Review.countDocuments()
    }

    res.status(200).json({
      reviews,
      reviewsLength,
      pagination: {
        currentPage: page,
        nextPage: page + 1,
        previousPage: page - 1,
        hasNextPage: page_size * page < reviewsLength,
        hasPreviousPage: page > 1,
        lastPage: Math.ceil(reviewsLength / page_size),
      },
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

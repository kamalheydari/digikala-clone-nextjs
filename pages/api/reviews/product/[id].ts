import { Review } from 'models'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels } from 'types'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'GET':
      await getReviews(req, res)
      break

    default:
      break
  }
}

const getReviews = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query.page ? +req.query.page : 1
  const page_size = req.query.page_size ? +req.query.page_size : 5

  try {
    await db.connect()

    const reviews: DataModels.IReviewDocument[] | null = await Review.find({
      product: req.query.id,
      status: 2,
    })
      .populate('user', 'name')
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        createdAt: 'desc',
      })

    const reviewsLength = await Review.countDocuments({
      product: req.query.id,
      status: 2,
    })

    await db.disconnect()

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

export default handler

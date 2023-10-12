import { Banner } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { IBannerDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await createBanner(req, res)
      break
    case 'GET':
      await getBanners(req, res)
      break

    default:
      break
  }
}

const createBanner = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()
    const newBanner = new Banner({ ...req.body })

    await newBanner.save()

    res.status(201).json({ msg: 'ساخت بنر جدید موفقیت آمیز بود' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const getBanners = async (req: NextApiRequest, res: NextApiResponse) => {
  const category = req.query?.category
  try {
    await db.connect()

    const banners: IBannerDocument[] = await Banner.find({
      category_id: category,
    })

    res.status(201).json(banners)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

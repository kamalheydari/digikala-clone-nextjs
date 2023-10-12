import { Banner } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { IBannerDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getBanner(req, res)
      break

    case 'PUT':
      await updateBanner(req, res)
      break

    case 'DELETE':
      await deleteBanner(req, res)
      break

    default:
      break
  }
}

const getBanner = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    const { id } = req.query
    await db.connect()
    const banner: IBannerDocument | null = await Banner.findById(id)

    if (banner) res.status(200).json(banner)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateBanner = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Banner.findByIdAndUpdate({ _id: id }, req.body)

    res.status(200).json({
      msg: 'بنر با موفقیت بروزرسانی شد',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const deleteBanner = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Banner.findByIdAndDelete(id)

    res.status(200).json({ msg: 'بنر با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

import { Banner } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      await getBanner(req, res)
      break

    case 'PATCH':
      await updateBanner(req, res)
      break

    case 'DELETE':
      await deleteBanner(req, res)
      break

    default:
      break
  }
}

const getBanner = async (req, res) => {
  try {
    const { id } = req.query
    await db.connect()
    const banner = await Banner.findById(id)
    await db.disconnect()

    res.status(200).json(banner)
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

const updateBanner = async (req, res) => {
  try {
    const result = await auth(req, res)
    if (!result.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Banner.findByIdAndUpdate({ _id: id }, req.body)
    const banner = await Banner.findById(id)
    await db.disconnect()

    res.status(200).json({
      msg: 'بنر با موفقیت بروزرسانی شد',
      category_id: banner.category_id,
    })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

const deleteBanner = async (req, res) => {
  try {
    const result = await auth(req, res)

    if (!result.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Banner.findByIdAndDelete(id)
    await db.disconnect()

    res.status(200).json({ msg: 'بنر با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

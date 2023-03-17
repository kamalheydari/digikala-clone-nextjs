import db from 'lib/db'
import Slider from 'models/Slider'

import auth from 'middleware/auth'
import sendError from 'utils/sendError'

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      await getSlider(req, res)
      break

    case 'PATCH':
      await updateSlider(req, res)
      break

    case 'DELETE':
      await deleteSlider(req, res)
      break

    default:
      break
  }
}

const getSlider = async (req, res) => {
  try {
    const { id } = req.query
    await db.connect()
    const slider = await Slider.findOne({ category_id: id })
    await db.disconnect()

    res.status(200).json(slider)
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

const updateSlider = async (req, res) => {
  try {
    const result = await auth(req, res)
    if (!result.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Slider.findByIdAndUpdate({ _id: id }, req.body)
    await db.disconnect()

    res.status(200).json({ msg: 'اسلایدر با موفقیت بروزرسانی شد' })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

const deleteSlider = async (req, res) => {
  try {
    const result = await auth(req, res)

    if (!result.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Slider.findByIdAndDelete(id)
    await db.disconnect()

    res.status(200).json({ msg: 'اسلایدر با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

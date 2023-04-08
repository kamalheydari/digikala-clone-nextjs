import { Slider } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

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
    const slider = await Slider.findById(id)
    await db.disconnect()

    res
      .status(200)
      .json({
        msg: 'اسلایدر با موفقیت بروزرسانی شد',
        category_id: slider.category_id,
      })
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

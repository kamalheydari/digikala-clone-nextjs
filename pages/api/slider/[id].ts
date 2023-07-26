import { Slider } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels } from 'types'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
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

const getSlider = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id } = req.query
    await db.connect()
    const slider: DataModels.ISliderDocument | null = await Slider.findById(id)
    await db.disconnect()

    res.status(200).json(slider)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateSlider = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)
    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Slider.findByIdAndUpdate({ _id: id }, req.body)
    await db.disconnect()

    res.status(200).json({
      msg: 'اسلایدر با موفقیت بروزرسانی شد',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const deleteSlider = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Slider.findByIdAndDelete(id)
    await db.disconnect()

    res.status(200).json({ msg: 'اسلایدر با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

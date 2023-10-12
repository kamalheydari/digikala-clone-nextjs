import { Slider } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { ISliderDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
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

const getSlider = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    const { id } = req.query
    await db.connect()
    const slider: ISliderDocument | null = await Slider.findById(id)

    res.status(200).json(slider)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateSlider = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Slider.findByIdAndUpdate({ _id: id }, req.body)

    res.status(200).json({
      msg: 'اسلایدر با موفقیت بروزرسانی شد',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const deleteSlider = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Slider.findByIdAndDelete(id)

    res.status(200).json({ msg: 'اسلایدر با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

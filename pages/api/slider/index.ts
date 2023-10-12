import { Slider } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { ISliderDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await createSlider(req, res)
      break

    case 'GET':
      await getSliders(req, res)
      break

    default:
      break
  }
}

const getSliders = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  const category = req.query?.category
  try {
    await db.connect()
    const sliders: ISliderDocument[] | null = await Slider.find({
      category_id: category,
    })

    res.status(201).json(sliders)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const createSlider = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()
    const newSlider = new Slider({ ...req.body })
    await newSlider.save()

    res.status(201).json({ msg: 'ساخت اسلایدر جدید موفقیت آمیز بود' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

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

const getSliders = async (req: NextApiRequest, res: NextApiResponse) => {
  const category = req.query?.category
  try {
    await db.connect()
    const sliders: DataModels.ISliderDocument[] | null = await Slider.find({
      category_id: category,
    })
    await db.disconnect()

    res.status(201).json(sliders)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const createSlider = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')
    await db.connect()
    const newSlider = new Slider({ ...req.body })
    await newSlider.save()
    await db.disconnect()

    res.status(201).json({ msg: 'ساخت اسلایدر جدید موفقیت آمیز بود' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

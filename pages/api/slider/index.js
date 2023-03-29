import { Slider } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

export default async function (req, res) {
  switch (req.method) {
    case 'POST':
      await createSlider(req, res)
      break

    default:
      break
  }
}

const createSlider = async (req, res) => {
  try {
    const result = await auth(req, res)

    if (!result.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')
    await db.connect()
    const newSlider = new Slider({ ...req.body })
    await newSlider.save()
    await db.disconnect()

    res.status(201).json({ msg: 'ساخت اسلایدر جدید موفقیت آمیز بود' })
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

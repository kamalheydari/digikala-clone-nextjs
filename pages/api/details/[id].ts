import { Details } from 'models'

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
      await getDetails(req, res)
      break

    case 'PUT':
      await updateDetails(req, res)
      break

    case 'DELETE':
      await deleteDetails(req, res)
      break

    default:
      break
  }
}

const getDetails = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query
    await db.connect()
    const details: DataModels.IDetailsDocument | null = await Details.findOne({
      category_id: id,
    })
    await db.disconnect()

    if (details) res.status(200).json(details)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)
    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Details.findByIdAndUpdate({ _id: id }, { ...req.body })
    const details: DataModels.IDetailsDocument | null = await Details.findById(
      id
    )
    await db.disconnect()

    res.status(200).json({
      msg: 'مشخصات دسته بندی با موفقیت بروزرسانی شد',
      category_id: details?.category_id,
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const deleteDetails = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Details.findByIdAndDelete(id)
    await db.disconnect()

    res.status(200).json({ msg: 'مشخصات دسته بندی با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

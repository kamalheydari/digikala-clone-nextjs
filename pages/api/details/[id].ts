import { Details } from 'models'

import { sendError, db, roles } from 'utils'

import type { NextApiResponse } from 'next'
import type { IDetailsDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
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
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const { id } = req.query
    await db.connect()
    const details: IDetailsDocument | null = await Details.findOne({
      category_id: id,
    })

    if (details) res.status(200).json(details)
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const updateDetails = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Details.findByIdAndUpdate({ _id: id }, { ...req.body })
    const details: IDetailsDocument | null = await Details.findById(id)

    res.status(200).json({
      msg: 'مشخصات دسته بندی با موفقیت بروزرسانی شد',
      category_id: details?.category_id,
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const deleteDetails = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query

    await db.connect()
    await Details.findByIdAndDelete(id)

    res.status(200).json({ msg: 'مشخصات دسته بندی با موفقیت حذف شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

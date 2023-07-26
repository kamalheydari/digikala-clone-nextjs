import { User } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'PATCH':
      await updateRole(req, res)
      break

    default:
      break
  }
}

const updateRole = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    if (result?.role !== 'admin')
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const { id } = req.query
    const { role } = req.body

    await db.connect()
    await User.findOneAndUpdate({ _id: id }, { role })
    await db.disconnect()

    res.status(200).json({ msg: 'اطلاعات کاربری با موفقیت به روز رسانی شد' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

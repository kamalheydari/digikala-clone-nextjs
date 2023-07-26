import { User } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels } from 'types'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'PATCH':
      await uploadInfo(req, res)
      break

    case 'GET':
      await getUsers(req, res)
      break

    default:
      break
  }
}

const uploadInfo = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)
    if (!result)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()
    await User.findOneAndUpdate({ _id: result.id }, req.body)
    await db.disconnect()

    res.status(201).json({
      msg: 'اطلاعات کاربری با موفقیت به روز رسانی شد',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const getUsers = async (req: NextApiRequest, res: NextApiResponse) => {
  const page = req.query.page ? +req.query.page : 1
  const page_size = req.query.page_size ? +req.query.page_size : 5

  try {
    const result = await auth(req, res)
    if (!result?.root && result?.role !== 'admin')
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()

    const users: DataModels.IUserDocument[] = await User.find()
      .select('-password -address')
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        createdAt: 'desc',
      })

    const usersLength = await User.countDocuments()

    await db.disconnect()

    res.status(200).json({
      users,
      usersLength,
      pagination: {
        currentPage: page,
        nextPage: page + 1,
        previousPage: page - 1,
        hasNextPage: page_size * page < usersLength,
        hasPreviousPage: page > 1,
        lastPage: Math.ceil(usersLength / page_size),
      },
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

import { User } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { IUserDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
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

const uploadInfo = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const userId = req.user._id

    await db.connect()
    await User.findOneAndUpdate({ _id: userId }, req.body)

    res.status(201).json({
      msg: 'اطلاعات کاربری با موفقیت به روز رسانی شد',
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

const getUsers = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  const page = req.query.page ? +req.query.page : 1
  const page_size = req.query.page_size ? +req.query.page_size : 5

  try {
    if (req.user.role === roles.USER)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()

    const users: IUserDocument[] = await User.find()
      .select('-password -address')
      .skip((page - 1) * page_size)
      .limit(page_size)
      .sort({
        createdAt: 'desc',
      })

    const usersLength = await User.countDocuments()

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

export default withUser(handler)

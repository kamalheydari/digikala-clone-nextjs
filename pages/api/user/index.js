import { User } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

export default async (req, res) => {
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

const uploadInfo = async (req, res) => {
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
    sendError(res, 500, error.message)
  }
}

const getUsers = async (req, res) => {
  const page = +req.query.page || 1
  const page_size = +req.query.page_size || 5

  try {
    const result = await auth(req, res)
    if (!result.root && result.role !== 'admin')
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()

    const users = await User.find()
      .select('-password')
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
    sendError(res, 500, error.message)
  }
}

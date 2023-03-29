import auth from 'middleware/auth'

import { User } from 'models'

import { sendError, db } from 'utils'

export default async function (req, res) {
  switch (req.method) {
    case 'GET':
      try {
        const result = await auth(req, res)

        await db.connect()

        const user = await User.findById({ _id: result.id })
        await db.disconnect()

        res.status(200).json({
          user: {
            name: user.name,
            email: user.email,
            mobile: user.mobile,
            address: user.address,
            role: user.role,
            root: user.root,
          },
        })
      } catch (error) {
        sendError(res, 500, error.message)
      }
      break

    default:
      break
  }
}

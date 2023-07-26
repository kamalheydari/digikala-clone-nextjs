import auth from 'middleware/auth'

import { User } from 'models'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels } from 'types'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'GET':
      try {
        const result = await auth(req, res)

        await db.connect()

        const user: DataModels.IUserDocument | null = await User.findById({
          _id: result?.id,
        }).select('-password')
        await db.disconnect()

        if (user)
          res.status(200).json({
            user,
          })
      } catch (error) {
        sendError(res, 500, (error as Error).message)
      }
      break

    default:
      break
  }
}

export default handler

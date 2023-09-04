import { User } from 'models'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'GET':
      try {
        const userId = req.headers['user-id']

        await db.connect()

        if (!userId) sendError(res, 400, 'havent account')
        const user = await User.findById({
          _id: userId,
        }).select('-password')

        await db.disconnect()

        if (user) res.status(200).json(user)
      } catch (error) {
        sendError(res, 500, (error as Error).message)
      }
      break

    default:
      break
  }
}

export default handler

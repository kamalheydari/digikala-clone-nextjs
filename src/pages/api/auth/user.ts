import { sendError } from 'utils'

import type { NextApiResponse } from 'next'
import type { NextApiRequestWithUser } from 'types'

import { withUser } from 'middlewares'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      try {
        const user = req.user
        if (!user) return sendError(res, 401, 'کاربر وجود ندارد')

        res.status(200).json(user)
      } catch (error) {
        sendError(res, 500, (error as Error).message)
      }
      break

    default:
      break
  }
}

export default withUser(handler)

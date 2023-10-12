import type { NextApiRequest } from 'next'
import { IUserDocument } from 'types'

interface NextApiRequestWithUser extends NextApiRequest {
  user: IUserDocument
}

export default NextApiRequestWithUser

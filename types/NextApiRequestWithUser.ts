import type { NextApiRequest } from 'next'
import DataModels from './dataModels'

// type CustomeNextApiRequest = NextApiRequest & DataModels.IUser

interface NextApiRequestWithUser extends NextApiRequest {
  user: DataModels.IUserDocument
}

export default NextApiRequestWithUser

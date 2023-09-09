import { NextApiHandler, type NextApiRequest, type NextApiResponse } from 'next'

import { destroyAccessToken, destroyLoggedIn } from 'utils'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'GET':
      await logout(req, res)
      break

    default:
      break
  }
}

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    //? Destroy Cookie

    res.setHeader('Set-Cookie', [destroyAccessToken, destroyLoggedIn])

    res.status(200).json({ msg: 'خروج موفقیت آمیز بود' })
  } catch (error) {
    res.status(500).json({ error: (error as Error).message })
  }
}

export default handler

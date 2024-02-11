import { sendError, roles } from '@/utils'

import { withUser } from '@/middlewares'

import sharp from 'sharp'

import type { NextApiResponse } from 'next'
import type { NextApiRequestWithUser } from '@/types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  switch (req.method) {
    case 'POST':
      await createPlaceholder(req, res)
      break

    default:
      break
  }
}

const createPlaceholder = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    if (req.user.role !== roles.ROOT) return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    const imageUrl = req.body

    // Fetch the image from the provided URL
    const response = await fetch(imageUrl)
    if (!response.ok) {
      throw new Error(`Failed to fetch image: ${response.statusText}`)
    }

    const imageBuffer = await response.arrayBuffer()

    const base64Image = await sharp(imageBuffer).resize(10).toFormat('png').toBuffer()

    // Convert the Buffer to a base64 string
    const base64String = base64Image.toString('base64')

    res.status(200).json({ placeholder: base64String, imageUrl })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

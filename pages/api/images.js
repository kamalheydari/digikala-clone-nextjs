import path from 'path'
import { promises as fs } from 'fs'

import sendError from 'utils/sendError'

export default async function handler(req, res) {
  try {
    const jsonDirectory = path.join(process.cwd(), 'json')

    const fileContents = await fs.readFile(
      jsonDirectory + '/images.json',
      'utf8'
    )

    res.status(200).json(fileContents)
  } catch (error) {
    sendError(res, 500, error.message)
  }
}

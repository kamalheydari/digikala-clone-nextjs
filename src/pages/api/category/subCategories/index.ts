import { Category } from 'models'

import { sendError, db } from 'utils'

import type { NextApiResponse, NextApiRequest } from 'next'
import type { ICategoryDocument } from 'types'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  switch (req.method) {
    case 'GET':
      await getSubCategories(req, res)
      break

    default:
      break
  }
}

const getSubCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { id, slug } = req.query

    await db.connect()

    let category: ICategoryDocument | null = null
    let childCategories: ICategoryDocument[] | [] = []

    if (id) {
      category = await Category.findById(id)
    } else if (slug) {
      category = await Category.findOne({ slug })
    }

    if (category) {
      childCategories = await Category.find({ parent: category._id })
    }

    res.status(200).json({
      category,
      children: childCategories,
    })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

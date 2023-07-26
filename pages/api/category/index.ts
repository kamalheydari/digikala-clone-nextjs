import { Category } from 'models'

import auth from 'middleware/auth'

import { sendError, db } from 'utils'

import type { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import type { DataModels, ICategoriesList } from 'types'

const handler: NextApiHandler = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  switch (req.method) {
    case 'POST':
      await createCategory(req, res)
      break

    case 'GET':
      await getCategories(req, res)
      break

    default:
      break
  }
}

const createCategory = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const result = await auth(req, res)

    if (!result?.root)
      return sendError(res, 403, 'شما اجازه انجام این عملیات را ندارید')

    await db.connect()
    let newCategory
    if (req.body.parent)
      newCategory = new Category({
        ...req.body,
      })
    else
      newCategory = new Category({
        name: req.body.name,
        slug: req.body.slug,
        image: req.body.image,
        colors: req.body.colors,
        level: req.body.level,
      })
    await newCategory.save()
    await db.disconnect()

    res.status(201).json({ msg: 'ساخت دسته بندی جدید موفقیت آمیز بود' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}
const getCategories = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    await db.connect()
    const categories: DataModels.ICategoryDocument[] = await Category.find()

    const getCategoriesWithChildren = async (): Promise<ICategoriesList[]> => {
      const allCategories: DataModels.ICategoryDocument[] =
        await Category.find()

      function findChildren(category: DataModels.ICategory): ICategoriesList {
        const children: DataModels.ICategory[] = allCategories.filter(
          (c: DataModels.ICategory) => c.parent && c.parent.equals(category._id)
        )

        const categoryWithChildren: ICategoriesList = {
          ...category.toObject(),
          children: [],
        }
        if (children.length > 0) {
          categoryWithChildren.children = children.map(
            (child: DataModels.ICategory) => findChildren(child)
          )
        }

        return categoryWithChildren
      }

      const rootCategories: DataModels.ICategory[] = allCategories.filter(
        (c: DataModels.ICategory) => !c.parent
      )
      const categoriesWithChildren: ICategoriesList[] = rootCategories.map(
        (category: DataModels.ICategory) => findChildren(category)
      )

      return categoriesWithChildren
    }
    const categoriesList = await getCategoriesWithChildren()

    await db.disconnect()

    res.status(200).json({ categories, categoriesList: categoriesList[0] })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default handler

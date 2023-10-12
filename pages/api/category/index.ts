import { Category } from 'models'

import { sendError, db, roles } from 'utils'

import { withUser } from 'middlewares'

import type { NextApiResponse } from 'next'
import type { ICategoriesList, ICategoryDocument } from 'types'
import type { NextApiRequestWithUser } from 'types'

const handler = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
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

const createCategory = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    if (req.user.role !== roles.ROOT)
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

    res.status(201).json({ msg: 'ساخت دسته بندی جدید موفقیت آمیز بود' })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}
const getCategories = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    await db.connect()
    const categories: ICategoryDocument[] = await Category.find()

    const getCategoriesWithChildren = async (): Promise<ICategoriesList[]> => {
      function findChildren(category: ICategoryDocument): ICategoriesList {
        const children: ICategoryDocument[] = categories.filter(
          // @ts-ignore
          (c) => c.parent?.equals(category._id)
        )

        const categoryWithChildren: ICategoriesList = {
          // @ts-ignore
          ...category.toObject(),
          children: [],
        }
        if (children.length > 0) {
          categoryWithChildren.children = children.map(
            (child: ICategoryDocument) => findChildren(child)
          )
        }

        return categoryWithChildren
      }

      const rootCategories: ICategoryDocument[] = categories.filter(
        (c: ICategoryDocument) => !c.parent
      )
      const categoriesWithChildren: ICategoriesList[] = rootCategories.map(
        (category: ICategoryDocument) => findChildren(category)
      )

      return categoriesWithChildren
    }
    const categoriesList = await getCategoriesWithChildren()

    res.status(200).json({ categoriesList: categoriesList[0], categories })
  } catch (error) {
    sendError(res, 500, (error as Error).message)
  }
}

export default withUser(handler)

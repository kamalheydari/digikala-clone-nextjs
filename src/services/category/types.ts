import type { ICategoriesList, ICategory, ICategoryForm } from '@/types'

export type MsgResult = { msg: string }
export type IdQuery = { id: string }
export type GetCategoriesResult = {
  categories: ICategory[]
  categoriesList: ICategoriesList
}
export type GetSingleCategoryResult = ICategory
export type UpdateCategoryQuery = { id: string; body: ICategory }
export type CreateCategoryQuery = {
  body: ICategoryForm
}
export type GetSubCategoriesQuery = { id?: string; slug?: string }
export type GetSubCategoriesResult = {
  category: ICategory
  children: ICategory[] | []
}

import type { ICategory } from '@/types'

export default interface ICategoriesList extends ICategory {
  children?: ICategoriesList[]
}

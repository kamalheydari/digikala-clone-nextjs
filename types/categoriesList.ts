import type { DataModels } from 'types'

export default interface ICategoriesList extends DataModels.ICategory {
  children?: ICategoriesList[]
}

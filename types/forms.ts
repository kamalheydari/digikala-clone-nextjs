import type { DataModels } from 'types'

export type ICategoryForm = Omit<
  DataModels.ICategory,
  '_id' | 'children' | 'createdAt' | 'updatedAt'
>

export type IBannerForm = Omit<
  DataModels.IBanner,
  '_id' | 'createdAt' | 'updatedAt'
>

export type ISliderForm = Omit<
  DataModels.ISlider,
  '_id' | 'createdAt' | 'updatedAt'
>

export type IDetailsForm = Omit<
  DataModels.IDetails,
  '_id' | 'createdAt' | 'updatedAt'
>

export type IProductForm = Omit<
  DataModels.IProduct,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'sold'
  | 'numReviews'
  | 'rating'
  | 'info'
  | 'specification'
> & {
  info: { title: string; value: string }[] | { title: string }[]
  specification: { title: string; value: string }[] | { title: string }[]
  optionsType: 'colors' | 'sizes' | 'none'
}

export type IReviewForm = Pick<
  DataModels.IReview,
  'rating' | 'title' | 'negativePoints' | 'positivePoints' | 'comment'
>

export type ILoginForm = {
  email: string
  password: string
}

export type IRegister = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

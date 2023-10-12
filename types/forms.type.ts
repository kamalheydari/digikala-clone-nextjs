import type {
  IBanner,
  ICategory,
  IDetails,
  IProduct,
  IReview,
  ISlider,
} from 'types'

export type ICategoryForm = Omit<
  ICategory,
  '_id' | 'children' | 'createdAt' | 'updatedAt'
>

export type IBannerForm = Omit<IBanner, '_id' | 'createdAt' | 'updatedAt'>

export type ISliderForm = Omit<ISlider, '_id' | 'createdAt' | 'updatedAt'>

export type IDetailsForm = Omit<IDetails, '_id' | 'createdAt' | 'updatedAt'>

export type IProductForm = Omit<
  IProduct,
  | '_id'
  | 'createdAt'
  | 'updatedAt'
  | 'sold'
  | 'numReviews'
  | 'rating'
  | 'info'
  | 'specification'
  | 'category_levels'
> & {
  info: { title: string; value: string }[] | { title: string }[]
  specification: { title: string; value: string }[] | { title: string }[]
  optionsType: 'colors' | 'sizes' | 'none'
  category_levels: {
    level_one: string
    level_two: string
    Level_three: string
  }
}

export type IReviewForm = Pick<
  IReview,
  'rating' | 'title' | 'negativePoints' | 'positivePoints' | 'comment'
>

export type ILoginForm = {
  email: string
  password: string
}

export type IRegisterForm = {
  name: string
  email: string
  password: string
  confirmPassword: string
}

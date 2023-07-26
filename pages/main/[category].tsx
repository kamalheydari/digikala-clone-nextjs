import Head from 'next/head'

import { db } from 'utils'

import { Category, Banner, Slider } from 'models'

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  ClientLayout,
  DiscountSlider,
  MostFavouraiteProducts,
  Slider as MainSlider,
} from 'components'

import type {
  GetStaticPaths,
  GetStaticProps,
  InferGetStaticPropsType,
  NextPage,
} from 'next'
import type { DataModels } from 'types'

interface Props {
  currentCategory: DataModels.ICategory
  childCategories: {
    title: string
    categories: DataModels.ICategory[]
  }
  sliders: DataModels.ISlider[]
  bannerOneType: DataModels.IBanner[]
  bannerTwoType: DataModels.IBanner[]
}

const MainCategory: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (
  props
) => {
  //? Props
  const {
    currentCategory,
    childCategories,
    sliders,
    bannerOneType,
    bannerTwoType,
  } = props

  //? Render(s)
  return (
    <ClientLayout>
      <main className='min-h-screen space-y-6 xl:mt-28'>
        <Head>
          <title>{`دیجی‌کالا | ${currentCategory.name}`}</title>
        </Head>

        <div className='py-4 mx-auto space-y-12 xl:mt-28 lg:max-w-[1450px]'>
          <MainSlider data={sliders} />

          <DiscountSlider currentCategory={currentCategory} />

          <Categories
            childCategories={childCategories}
            color={currentCategory.colors?.start}
            name={currentCategory.name}
          />

          <BannerOne data={bannerOneType} />

          <BestSellsSlider categorySlug={currentCategory.slug} />

          <BannerTwo data={bannerTwoType} />

          <MostFavouraiteProducts categorySlug={currentCategory.slug} />
        </div>
      </main>
    </ClientLayout>
  )
}

export const getStaticProps: GetStaticProps<
  Props,
  { category: string }
> = async ({ params }) => {
  await db.connect()

  const currentCategory = await Category.findOne({
    slug: params?.category,
  }).lean()

  if (!currentCategory) return { notFound: true }

  const sliders = await Slider.find({ category_id: currentCategory?._id })

  const bannerOneType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'one',
  })
  const bannerTwoType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'two',
  })

  const childCategories = await Category.find({
    parent: currentCategory?._id,
  }).lean()

  await db.disconnect()

  return {
    revalidate: 180,
    props: {
      currentCategory: JSON.parse(JSON.stringify(currentCategory)),
      childCategories: {
        title: 'خرید بر اساس دسته‌بندهای',
        categories: JSON.parse(JSON.stringify(childCategories)),
      },
      sliders: JSON.parse(JSON.stringify(sliders)),
      bannerOneType: JSON.parse(JSON.stringify(bannerOneType)),
      bannerTwoType: JSON.parse(JSON.stringify(bannerTwoType)),
    },
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  await db.connect()

  const categories = await Category.find({
    level: 1,
  }).lean()

  await db.disconnect()

  const paths = categories.map((cat) => ({ params: { category: cat.slug } }))
  return {
    paths,
    fallback: false,
  }
}

export default MainCategory

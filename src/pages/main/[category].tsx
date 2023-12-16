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

import config from 'config'

import type { GetStaticPaths, GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { IBanner, ICategory, ISlider } from 'types'

interface Props {
  currentCategory: ICategory
  childCategories: {
    title: string
    categories: ICategory[]
  }
  sliders: ISlider[]
  bannerOneType: IBanner[]
  bannerTwoType: IBanner[]
}

export const getStaticProps: GetStaticProps<Props, { category: string }> = async ({ params }) => {
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

  return {
    revalidate: config.revalidate,
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

  const paths = categories.map((cat) => ({ params: { category: cat.slug } }))
  return {
    paths,
    fallback: false,
  }
}

const MainCategory: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  // ? Props
  const { currentCategory, childCategories, sliders, bannerOneType, bannerTwoType } = props

  // ? Render(s)
  return (
    <ClientLayout>
      <main className="min-h-screen space-y-6 xl:mt-28">
        <Head>
          <title>{`دیجی‌کالا | ${currentCategory.name}`}</title>
        </Head>

        <div className="mx-auto space-y-12 py-4 lg:max-w-[1450px] xl:mt-28">
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

export default MainCategory

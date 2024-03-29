import Head from 'next/head'

import { db, siteDescription } from '@/utils'

import { Category, Slider, Banner } from '@/models'

import config from '@/config'

import { LargeBanner, SmallBanner } from '@/components/banners'
import { ClientLayout } from '@/components/Layouts'
import { MainSlider, DiscountSlider, BestSellsSlider, ProductFavouriteSlider } from '@/components/sliders'
import { CategoryList } from '@/components/categories'

import type { GetStaticProps, InferGetStaticPropsType, NextPage } from 'next'
import type { IBanner, ICategory, ISlider } from '@/types'

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

export const getStaticProps: GetStaticProps<Props> = async () => {
  await db.connect()

  const currentCategory = await Category.findOne({
    parent: undefined,
  }).lean()

  const childCategories = await Category.find({
    parent: currentCategory?._id,
  }).lean()

  const sliders = await Slider.find({ category_id: currentCategory?._id })

  const bannerOneType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'one',
  })
  const bannerTwoType = await Banner.find({
    category_id: currentCategory?._id,
    type: 'two',
  })

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

const Home: NextPage<InferGetStaticPropsType<typeof getStaticProps>> = (props) => {
  // ? Props
  const { currentCategory, childCategories, sliders, bannerOneType, bannerTwoType } = props

  // ? Render(s)
  return (
    <ClientLayout>
      <main className="min-h-screen space-y-4 xl:mt-28">
        <Head>
          <title>فروشگاه اینترنتی دیجی‌کالا</title>
          <meta name="description" content={siteDescription} />
        </Head>
        <div className="mx-auto space-y-24 py-4 lg:max-w-[1450px] xl:mt-28">
          <MainSlider data={sliders} />
          <DiscountSlider currentCategory={currentCategory} />

          <CategoryList
            childCategories={childCategories}
            color={currentCategory?.colors?.start}
            name={currentCategory?.name}
            homePage
          />

          <LargeBanner data={bannerOneType} />

          <BestSellsSlider categorySlug={currentCategory?.slug} />

          <SmallBanner data={bannerTwoType} />

          <ProductFavouriteSlider categorySlug={currentCategory?.slug} />
        </div>
      </main>
    </ClientLayout>
  )
}

export default Home

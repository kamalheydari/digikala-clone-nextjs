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

export default function MainCategory(props) {
  //? Props
  const { currentCategory, childCategories, slider, banners } = props

  //? Render(s)
  return (
    <ClientLayout>
      <main className='min-h-screen space-y-6 xl:mt-28'>
        <Head>
          <title>{`دیجی‌کالا | ${currentCategory.name}`}</title>
        </Head>

        <MainSlider data={slider} />

        <div className='py-4 mx-auto space-y-12 xl:mt-28 lg:max-w-[1450px]'>
          <DiscountSlider
            categoryId={currentCategory._id}
            currentCategory={currentCategory}
          />

          <Categories
            childCategories={childCategories}
            color={currentCategory.colors?.start}
            name={currentCategory.name}
          />

          <BannerOne data={banners} />

          <BestSellsSlider categoryId={currentCategory._id} />

          <BannerTwo data={banners} />

          <MostFavouraiteProducts categoryId={currentCategory._id} />
        </div>
      </main>
    </ClientLayout>
  )
}

export async function getStaticProps({ params: { category } }) {
  await db.connect()

  const currentCategory = await Category.findOne({
    slug: category,
  }).lean()

  if (!currentCategory) return { notFound: true }

  const slider = await Slider.findOne({ category_id: currentCategory._id })

  const banners = await Banner.findOne({ category_id: currentCategory._id })

  const childCategories = await Category.find({
    parent: currentCategory._id,
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
      slider: JSON.parse(JSON.stringify(slider)),
      banners: JSON.parse(JSON.stringify(banners)),
    },
  }
}

export async function getStaticPaths() {
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

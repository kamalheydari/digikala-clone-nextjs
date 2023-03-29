import Head from 'next/head'

import { db } from 'utils'

import { Product, Category } from 'models'

import {
  BannerOne,
  BannerTwo,
  BestSellsSlider,
  Categories,
  DiscountSlider,
  MostFavouraiteProducts,
  Slider,
} from 'components'

export default function MainCategory(props) {
  //? Props
  const {
    bestSells,
    mostFavourite,
    discountProducts,
    currentCategory,
    childCategories,
  } = props

  //? Render
  return (
    <main className='min-h-screen space-y-6 xl:mt-28'>
      <Head>
        <title>{`دیجی‌کالا | ${currentCategory.name}`}</title>
      </Head>

      <Slider id={currentCategory._id} />

      <div className='py-4 mx-auto space-y-12 xl:mt-28 lg:max-w-[1450px]'>
        <DiscountSlider
          discountProducts={discountProducts}
          currentCategory={currentCategory}
        />

        <Categories
          childCategories={childCategories}
          color={currentCategory.colors?.start}
          name={currentCategory.name}
        />

        <BannerOne id={currentCategory._id} />

        <BestSellsSlider bestSells={bestSells} />

        <BannerTwo id={currentCategory._id} />

        <MostFavouraiteProducts mostFavourite={mostFavourite} />
      </div>
    </main>
  )
}

export async function getStaticProps({ params: { category } }) {
  const filterFilelds =
    '-description -info -specification -sizes -colors -category -category_levels -numReviews -reviews'

  await db.connect()

  const currentCategory = await Category.findOne({
    slug: category,
  }).lean()

  if (!currentCategory) return { notFound: true }

  const currentCategoryID = await JSON.parse(
    JSON.stringify(currentCategory._id)
  )

  const categoryFilter = {
    category: { $in: currentCategoryID },
  }

  const bestSells = await Product.find(categoryFilter)
    .select(filterFilelds)
    .sort({ sold: -1 })
    .limit(15)
    .lean()

  const mostFavourite = await Product.find(categoryFilter)
    .select(filterFilelds)
    .sort({ rating: -1 })
    .limit(10)
    .lean()

  const discountProducts = await Product.find({
    ...categoryFilter,
    discount: { $gte: 1 },
    inStock: { $gte: 1 },
  })
    .select(filterFilelds)
    .limit(10)
    .sort({ discount: -1 })
    .lean()

  const childCategories = await Category.find({
    parent: currentCategory._id,
  }).lean()

  await db.disconnect()

  return {
    revalidate: 180,
    props: {
      bestSells: {
        title: 'پرفروش‌ترین کالاها',
        products: JSON.parse(JSON.stringify(bestSells)),
      },
      discountProducts: {
        title: 'بیشترین تخیف',
        products: JSON.parse(JSON.stringify(discountProducts)),
      },
      mostFavourite: {
        title: ' محبوب ترین کالاها',
        products: JSON.parse(JSON.stringify(mostFavourite)),
      },
      currentCategory: JSON.parse(JSON.stringify(currentCategory)),
      childCategories: JSON.parse(JSON.stringify(childCategories)),
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

//? Layout
MainCategory.getClientLayout = function pageLayout(page) {
  return <>{page}</>
}

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

export default function Home(props) {
  //? Props
  const {
    bestSells,
    discountProducts,
    mostFavourite,
    currentCategory,
    childCategories,
  } = props

  //? Render(s)
  return (
    <main className='min-h-screen space-y-4 xl:mt-28'>
      <Head>
        <title>فروشگاه اینترنتی دیجی‌کالا</title>
        <meta
          name='description'
          content='هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!'
        />
      </Head>

      <Slider id={currentCategory._id} />

      <div className='py-4 mx-auto space-y-24 xl:mt-28 lg:max-w-[1450px]'>
        <DiscountSlider
          discountProducts={discountProducts}
          currentCategory={currentCategory}
        />

        <Categories
          childCategories={childCategories}
          color={currentCategory.colors?.start}
          name={currentCategory.name}
          homePage
        />

        <BannerOne id={currentCategory._id} />

        <BestSellsSlider bestSells={bestSells} />

        <BannerTwo id={currentCategory._id} />

        <MostFavouraiteProducts mostFavourite={mostFavourite} />
      </div>
    </main>
  )
}

export async function getStaticProps() {
  const filterFilelds =
    '-description -info -specification -sizes -colors -category -category_levels -numReviews -reviews'

  await db.connect()

  const bestSells = await Product.find()
    .select(filterFilelds)
    .sort({ sold: -1 })
    .limit(15)
    .lean()

  const discountProducts = await Product.find({
    discount: { $gte: 1 },
    inStock: { $gte: 1 },
  })
    .select(filterFilelds)
    .sort({ discount: -1 })
    .limit(15)
    .lean()

  const mostFavourite = await Product.find()
    .select(filterFilelds)
    .sort({ rating: -1 })
    .limit(10)
    .lean()

  const currentCategory = await Category.findOne({
    parent: undefined,
  }).lean()

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

//? Layout
Home.getClientLayout = function pageLayout(page) {
  return <>{page}</>
}

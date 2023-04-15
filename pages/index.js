import Head from 'next/head'

import { db } from 'utils'

import { Category, Slider, Banner } from 'models'

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

export default function Home(props) {
  //? Props
  const { currentCategory, childCategories, slider, banners } = props

  //? Render(s)
  return (
    <ClientLayout>
      <main className='min-h-screen space-y-4 xl:mt-28'>
        <Head>
          <title>فروشگاه اینترنتی دیجی‌کالا</title>
          <meta
            name='description'
            content='هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!'
          />
        </Head>

        <MainSlider data={slider} />

        <div className='py-4 mx-auto space-y-24 xl:mt-28 lg:max-w-[1450px]'>
          <DiscountSlider currentCategory={currentCategory} />

          <Categories
            childCategories={childCategories}
            color={currentCategory.colors?.start}
            name={currentCategory.name}
            homePage
          />

          <BannerOne data={banners} />

          <BestSellsSlider />

          <BannerTwo data={banners} />

          <MostFavouraiteProducts />
        </div>
      </main>
    </ClientLayout>
  )
}

export async function getStaticProps() {
  await db.connect()

  const currentCategory = await Category.findOne({
    parent: undefined,
  }).lean()

  const childCategories = await Category.find({
    parent: currentCategory._id,
  }).lean()

  const slider = await Slider.findOne({ category_id: currentCategory._id })

  const banners = await Banner.findOne({ category_id: currentCategory._id })

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

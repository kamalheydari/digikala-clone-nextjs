import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Product } from 'models'

import { db } from 'utils'

import { useDispatch } from 'react-redux'
import { setTempColor, setTempSize, addToLastSeen } from 'store'

import {
  FreeShipping,
  Services,
  SmilarProductsSlider,
  ImageGallery,
  Description,
  Specification,
  Reviews,
  SelectColor,
  SelectSize,
  OutOfStock,
  AddToCart,
  Info,
  Breadcrumb,
  ClientLayout,
} from 'components'

export default function SingleProduct(props) {
  //? Props
  const { product, smilarProducts } = props

  //? Assets
  const dispatch = useDispatch()
  const router = useRouter()

  //? initial color and size
  useEffect(() => {
    if (product.colors.length > 0) {
      dispatch(setTempColor(product.colors[0]))
      dispatch(setTempSize(null))
    } else if (product.sizes.length > 0) {
      dispatch(setTempSize(product.sizes[0]))
      dispatch(setTempColor(null))
    } else {
      dispatch(setTempColor(null))
      dispatch(setTempSize(null))
    }
  }, [router.query.id])

  //? Add To LastSeen
  useEffect(() => {
    dispatch(
      addToLastSeen({
        productID: product._id,
        image: product.images[0],
        title: product.title,
      })
    )
  }, [product._id])

  //? Render(s)
  return (
    <>
      <Head>
        <title>{`خرید ${product.title}`}</title>
        <meta
          name='description'
          content='هر آنچه که نیاز دارید با بهترین قیمت از دیجی‌کالا بخرید! جدیدترین انواع گوشی موبایل، لپ تاپ، لباس، لوازم آرایشی و بهداشتی، کتاب، لوازم خانگی، خودرو و... با امکان تعویض و مرجوعی آسان | ✓ارسال رايگان ✓پرداخت در محل ✓ضمانت بازگشت کالا - برای خرید کلیک کنید!'
        />
      </Head>

      <ClientLayout>
        <main className='xl:mt-28 lg:max-w-[1550px] mx-auto py-4 space-y-4'>
          <Breadcrumb categoires={product.category_levels} />

          <div className='h-fit lg:h-fit lg:grid lg:grid-cols-9 lg:px-4 lg:gap-x-2 lg:gap-y-4 lg:mb-10 xl:gap-x-7'>
            <ImageGallery
              images={product.images}
              discount={product.discount}
              inStock={product.inStock}
              productName={product.title}
            />

            <div className='lg:col-span-4 '>
              {/* title */}
              <h2 className='p-3 text-base font-semibold leading-8 tracking-wide text-black/80 '>
                {product.title}
              </h2>

              <div className='section-divide-y' />

              {product.inStock > 0 && product.colors.length > 0 && (
                <SelectColor colors={product.colors} />
              )}

              {product.inStock > 0 && product.sizes.length > 0 && (
                <SelectSize sizes={product.sizes} />
              )}

              {product.inStock === 0 && <OutOfStock />}

              <Info infos={product?.info} />

              <FreeShipping />
            </div>

            <div className='lg:col-span-2'>
              {product.inStock > 0 && <AddToCart product={product} />}
            </div>
          </div>

          <Services />

          {product.description.length > 0 && (
            <Description description={product.description} />
          )}

          <SmilarProductsSlider smilarProducts={smilarProducts} />

          <div className='section-divide-y' />

          <div className='flex'>
            <div className='flex-1'>
              <Specification specification={product.specification} />

              <div className='section-divide-y' />

              <Reviews
                numReviews={product.numReviews}
                prdouctID={product._id}
                productTitle={product.title}
              />
            </div>

            <div className='hidden w-full px-3 lg:block lg:max-w-xs xl:max-w-sm'>
              {product.inStock > 0 && <AddToCart product={product} second />}
            </div>
          </div>
        </main>
      </ClientLayout>
    </>
  )
}

export async function getServerSideProps({ params: { id } }) {
  await db.connect()
  const product = await Product.findById({ _id: id })
    .populate('category_levels.level_one')
    .populate('category_levels.level_two')
    .populate('category_levels.Level_three')
    .lean()

  if (!product) return { notFound: true }

  const productCategoryID = product.category.pop()

  let smilarProducts = await Product.find({
    category: { $in: productCategoryID },
    inStock: { $gte: 1 },
  })
    .limit(11)
    .lean()

  smilarProducts = JSON.parse(JSON.stringify(smilarProducts)).filter(
    (item) => item._id !== id
  )

  await db.disconnect()

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      smilarProducts: {
        title: 'کالاهای مشابه',
        products: smilarProducts,
      },
    },
  }
}

import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Product } from 'models'

import { db } from 'utils'

import { useAppDispatch } from 'hooks'

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

import type { GetServerSideProps, NextPage } from 'next'
import type { DataModels } from 'types'

export type SmilarProductListType = Pick<
  DataModels.IProduct,
  | '_id'
  | 'colors'
  | 'discount'
  | 'images'
  | 'inStock'
  | 'price'
  | 'rating'
  | 'sold'
  | 'title'
>

export type CategoryLevels = Record<
  'levelOne' | 'levelTwo' | 'LevelThree',
  { name: string; slug: string }
>

interface Props {
  product: DataModels.IProduct
  smilarProducts: {
    title: string
    products: SmilarProductListType[]
  }
  categoryLevels: CategoryLevels
}

const SingleProduct: NextPage<Props> = (props) => {
  //? Props
  const { product, smilarProducts, categoryLevels } = props

  //? Assets
  const dispatch = useAppDispatch()
  const router = useRouter()

  //? initial color and size
  useEffect(() => {
    if (product.colors.length > 0) {
      dispatch(setTempColor(product?.colors[0]))
      dispatch(setTempSize(null))
    } else if (product.sizes.length > 0) {
      dispatch(setTempSize(product?.sizes[0]))
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
        <meta name='description' content={product.title} />
      </Head>

      <ClientLayout>
        <main className='xl:mt-28 lg:max-w-[1550px] mx-auto py-4 space-y-4'>
          <Breadcrumb categoryLevels={categoryLevels} />

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

export const getServerSideProps: GetServerSideProps<
  Props,
  { id: string }
> = async ({ params }) => {
  await db.connect()
  const product = await Product.findById({ _id: params?.id }).lean()

  if (!product) return { notFound: true }

  const productCategoryLevels = await Product.findById({ _id: params?.id })
    .populate('category_levels.level_one')
    .populate('category_levels.level_two')
    .populate('category_levels.Level_three')
    .lean()
    .select('category_levels')

  const categoryLevels = {
    levelOne: {
      name: productCategoryLevels?.category_levels.level_one.name,
      slug: productCategoryLevels?.category_levels.level_one.slug,
    },
    levelTwo: {
      name: productCategoryLevels?.category_levels.level_two.name,
      slug: productCategoryLevels?.category_levels.level_two.slug,
    },
    LevelThree: {
      name: productCategoryLevels?.category_levels.Level_three.name,
      slug: productCategoryLevels?.category_levels.Level_three.slug,
    },
  }

  const productCategoryID = product.category.pop()

  let smilarProducts = await Product.find({
    category: { $in: productCategoryID },
    inStock: { $gte: 1 },
  })
    .select(
      '-description -info -specification -category -category_levels -sizes  -reviews -numReviews'
    )
    .limit(11)
    .lean()

  smilarProducts = JSON.parse(JSON.stringify(smilarProducts)).filter(
    (item: SmilarProductListType) => item._id !== params?.id
  )

  await db.disconnect()

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      categoryLevels: JSON.parse(JSON.stringify(categoryLevels)),
      smilarProducts: {
        title: 'کالاهای مشابه',
        products: smilarProducts,
      },
    },
  }
}

export default SingleProduct

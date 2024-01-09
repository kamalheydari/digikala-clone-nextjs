import { useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { Product } from 'models'

import { db } from 'utils'

import { useAppDispatch } from 'hooks'

import { setTempColor, setTempSize, addToLastSeen } from 'store'

import { ClientLayout } from 'components/layouts'
import {
  ProductBreadcrumb,
  ProductGallery,
  ProductInfo,
  ProductDescription,
  ProductSpecificationList,
} from 'components/product'
import { ProductColorSelector, ProductSizeSelector } from 'components/product/ProductVariants'
import { ProductOutOfStockMessage } from 'components/product/StockInfo'
import { ReviewsList } from 'components/review'
import { SmilarProductsSlider } from 'components/sliders'
import { AddToCartButton, FreeShippingIndicator } from 'components/cart'
import { ServiceList } from 'components/services'

import type { GetServerSideProps, NextPage } from 'next'
import type { IProduct } from 'types'

interface Props {
  product: IProduct
  smilarProducts: {
    title: string
    products: IProduct[]
  }
}

export const getServerSideProps: GetServerSideProps<Props, { slug: string }> = async ({ params }) => {
  await db.connect()
  const product = await Product.findOne({ slug: params?.slug })
    .populate('category_levels.level_one')
    .populate('category_levels.level_two')
    .populate('category_levels.Level_three')
    .lean()

  if (!product) return { notFound: true }

  const productCategoryID = product.category.pop()

  const smilarProducts = await Product.find({
    category: { $in: productCategoryID },
    inStock: { $gte: 1 },
    _id: { $ne: product._id },
  })
    .select('-description -info -specification -category -category_levels -sizes -reviews -numReviews')
    .limit(11)
    .lean()

  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      smilarProducts: {
        title: 'کالاهای مشابه',
        products: JSON.parse(JSON.stringify(smilarProducts)),
      },
    },
  }
}

const SingleProduct: NextPage<Props> = (props) => {
  // ? Props
  const { product, smilarProducts } = props

  // ? Assets
  const dispatch = useAppDispatch()
  const router = useRouter()

  // ? initial color and size
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

  // ? Add To LastSeen
  useEffect(() => {
    dispatch(
      addToLastSeen({
        productID: product._id,
        image: product.images[0],
        title: product.title,
        slug: product.slug,
      })
    )
  }, [product._id])

  // ? Render(s)
  return (
    <>
      <Head>
        <title>{`خرید ${product.title}`}</title>
        <meta name="description" content={product.title} />
      </Head>

      <ClientLayout>
        <main className="mx-auto space-y-4 py-4 lg:max-w-[1550px] xl:mt-28">
          <ProductBreadcrumb categoryLevels={product.category_levels} />

          <div className="h-fit lg:mb-10 lg:grid lg:h-fit lg:grid-cols-9 lg:gap-x-2 lg:gap-y-4 lg:px-4 xl:gap-x-7">
            <ProductGallery
              images={product.images}
              discount={product.discount}
              inStock={product.inStock}
              productName={product.title}
            />

            <div className="lg:col-span-4 ">
              {/* title */}
              <h2 className="p-3 text-base font-semibold leading-8 tracking-wide text-black/80 ">{product.title}</h2>

              <div className="section-divide-y" />

              {product.inStock > 0 && product.optionsType === 'colors' && (
                <ProductColorSelector colors={product.colors} />
              )}

              {product.inStock > 0 && product.optionsType === 'sizes' && <ProductSizeSelector sizes={product.sizes} />}

              {product.inStock === 0 && <ProductOutOfStockMessage />}

              <ProductInfo infos={product?.info} />

              <FreeShippingIndicator />
            </div>

            <div className="lg:col-span-2">{product.inStock > 0 && <AddToCartButton product={product} />}</div>
          </div>

          <ServiceList />

          {product.description.length > 0 && <ProductDescription description={product.description} />}

          <SmilarProductsSlider smilarProducts={smilarProducts} />

          <div className="section-divide-y" />

          <div className="flex">
            <div className="flex-1">
              <ProductSpecificationList specification={product.specification} />

              <div className="section-divide-y" />

              <ReviewsList numReviews={product.numReviews} prdouctID={product._id} productTitle={product.title} />
            </div>

            <div className="hidden w-full px-3 lg:block lg:max-w-xs xl:max-w-sm">
              {product.inStock > 0 && <AddToCartButton product={product} second />}
            </div>
          </div>
        </main>
      </ClientLayout>
    </>
  )
}

export default SingleProduct

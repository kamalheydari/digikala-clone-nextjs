import Link from 'next/link'

import {
  DiscountProduct,
  ProductPrice,
  Icons,
  ResponsiveImage,
} from 'components'

export default function MostFavouraiteProducts({ mostFavourite }) {
  if (mostFavourite.products.length > 0)
    return (
      <section className='px-3'>
        <div className='flex items-center mb-3 gap-x-2'>
          <Icons.Heart className='icon text-amber-400' />
          <h4 className='text-xl'>{mostFavourite.title}</h4>
        </div>
        <div className='grid grid-cols-2 gap-1 md:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
          {mostFavourite.products.map((product) => (
            <Link key={product._id} href={`/products/${product._id}`}>
              <article className='p-1 transition border border-gray-50 hover:border-gray-200 min-h-[248px]'>
                <div className='flex gap-x-1 '>
                  <span className='text-base farsi-digits'>
                    {product.rating.toFixed(1)}
                  </span>
                  <Icons.Star className='w-5 h-5 md:w-7 md:h-7 text-amber-400 ' />
                </div>

                <ResponsiveImage
                  dimensions='h-32  w-28 md:w-32 md:h-36'
                  className='mx-auto'
                  src={product.images[0].url}
                  alt={product.title}
                />
                <div className='flex items-start mt-2 gap-x-2 justify-evenly'>
                  <DiscountProduct discount={product.discount} />
                  <ProductPrice
                    inStock={product.inStock}
                    discount={product.discount}
                    price={product.price}
                  />
                </div>
              </article>
            </Link>
          ))}
        </div>
      </section>
    )
  else return null
}

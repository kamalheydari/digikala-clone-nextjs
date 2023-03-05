import Image from 'next/image'
import Link from 'next/link'

import { DiscountProduct, ProductPrice, Icons } from 'components'

export default function MostFavouraiteProducts({ products }) {
  return (
    <section className='px-3'>
      <div className='flex items-center mb-3 gap-x-2'>
        <Icons.Heart className='icon text-amber-400' />
        <h4 className='text-xl'>محبوب ترین کالاها</h4>
      </div>
      <div className='grid grid-cols-2 gap-1 md:gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <a>
              <article className='p-1 transition border border-gray-50 hover:border-gray-200'>
                <div className='flex gap-x-1 '>
                  <span className='text-base farsi-digits'>
                    {product.rating.toFixed(1)}
                  </span>
                  <Icons.Star className='w-5 h-5 md:w-7 md:h-7 text-amber-400 ' />
                </div>
                <div className='relative h-32 mx-auto w-28 md:w-32 md:h-36 '>
                  <Image
                    src={product.images[0].url}
                    layout='fill'
                    alt={product.title}
                    placeholder='blur'
                    blurDataURL='/placeholder.png'
                  />
                </div>
                <div className='flex items-center mt-1 gap-x-2 justify-evenly '>
                  <div>
                    <DiscountProduct discount={product.discount} />
                  </div>
                  <ProductPrice
                    inStock={product.inStock}
                    discount={product.discount}
                    price={product.price}
                  />
                </div>
              </article>
            </a>
          </Link>
        ))}
      </div>
    </section>
  )
}

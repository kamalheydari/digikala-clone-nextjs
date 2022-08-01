import Image from "next/image";
import Link from "next/link";

import { DiscountProduct, ProductPrice, Icons } from "components";

export default function MostFavouraiteProducts({ products }) {
  return (
    <section className='px-3'>
      <div className='flex items-center mb-3 gap-x-2'>
        <Icons.Heart className='icon text-amber-400' />
        <h4 className='text-xl'>محبوب ترین کالاها</h4>
      </div>
      <div className='grid grid-cols-2 gap-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5'>
        {products.map((product) => (
          <Link key={product._id} href={`/products/${product._id}`}>
            <a>
              <article className='p-1 border border-gray-50 hover:border-gray-200 transition'>
                <div className='flex items-center gap-x-1 '>
                  <span className='text-base farsi-digits'>
                    {product.rating.toFixed(1)}
                  </span>
                  <Icons.Star className='w-7 h-7 text-amber-400' />
                </div>
                <div className='relative w-32 mx-auto h-36 '>
                  <Image src={product.images[0].url} layout='fill' />
                </div>
                <div className='flex justify-between px-3'>
                  <div>
                    <DiscountProduct product={product} />
                  </div>
                  <ProductPrice product={product} />
                </div>
              </article>
            </a>
          </Link>
        ))}
      </div>
    </section>
  );
}

import { Icons } from "components";
import Image from "next/image";
import Link from "next/link";
import { truncate } from "utils/truncate";

export default function BestSellsSlider({ products }) {
  return (
    <section className='px-3'>
      <div className='flex items-center mb-3 gap-x-2'>
        <Icons.Check className='w-7 h-7 text-amber-400' />
        <h4 className='text-xl'>پرفروش‌ترین کالاها</h4>
      </div>

      <div className='grid grid-cols-[repeat(5,280px)] md:grid-cols-[repeat(5,300px)] grid-rows-3 xl:grid-cols-[repeat(5,330px)] grid-flow-col overflow-x-auto  gap-x-2 p-2'>
        {products.map((item, index) => (
          <div key={item._id} className='p-1 w-60 md:w-72 xl:w-80'>
            <Link href={`/products/${item._id}`}>
              <a>
                <article className='flex gap-x-4'>
                  <div className='relative w-24 h-24 '>
                    <Image
                      src={item.images[0].url}
                      layout='fill'
                      alt={item.title}
                    />
                  </div>
                  <div className='flex items-center border-b gap-x-3'>
                    <span className='text-2xl farsi-digits text-sky-500 '>
                      {index + 1}
                    </span>
                    <span>{truncate(item.title, 25)}</span>
                  </div>
                </article>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
}

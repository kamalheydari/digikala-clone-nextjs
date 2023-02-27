import { Skeleton } from "components";
import useCategory from "hooks/useCategory";
import Image from "next/image";
import Link from "next/link";

export default function Categories({ parent, homePage, color, name }) {
  const { childCategories, isLoading } = useCategory(parent);

  //? Local Components
  const CategorySkeleton = () => (
    <Skeleton count={9}>
      <Skeleton.Items className='flex flex-col items-center gap-y-3'>
        <Skeleton.Item
          animated='background'
          height='h-32'
          width='w-32'
          className='rounded-full'
        />
        <Skeleton.Item
          animated='background'
          height='h-5'
          width='w-40'
          className='rounded-md'
        />
      </Skeleton.Items>
    </Skeleton>
  );

  return (
    <section className='px-3'>
      <h4 className='mb-3 text-xl text-center'>
        خرید بر اساس دسته‌بندهای{" "}
        <span
          className='text-xl'
          style={{
            color,
          }}
        >
          {name}
        </span>
      </h4>
      <div className='flex flex-wrap justify-center gap-4 mx-auto space-x-4 w-fit'>
        {isLoading ? (
          <CategorySkeleton />
        ) : (
          childCategories.map((item, index) => {
            if (index < 2) {
              return (
                <div key={index} className='text-center'>
                  <Link
                    href={
                      homePage
                        ? `/main/${item.slug}`
                        : `/products?category=${item.slug}`
                    }
                  >
                    <a className='text-center'>
                      <div className='relative w-32 h-32 mx-auto mb-1'>
                        <Image
                          src={item.image.url}
                          layout='fill'
                          alt={item.name}
                          placeholder='blur'
                          blurDataURL='/placeholder.png'
                        />
                      </div>
                      <span className='text-sm'>{item.name}</span>
                    </a>
                  </Link>
                </div>
              );
            } else {
              return (
                <div key={index} className='text-center grayscale'>
                  <div className='relative w-32 h-32 mx-auto mb-1'>
                    <Image
                      src={item.image.url}
                      layout='fill'
                      alt={item.name}
                      placeholder='blur'
                      blurDataURL='/placeholder.png'
                    />
                  </div>
                  <span className='text-sm'>{item.name}</span>
                </div>
              );
            }
          })
        )}
      </div>
    </section>
  );
}

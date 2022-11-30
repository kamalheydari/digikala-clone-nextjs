import useCategory from "hooks/useCategory";
import Image from "next/image";
import Link from "next/link";

export default function Categories({ parent, homePage, color, name }) {
  const { childCategories, isLoading } = useCategory(parent);
console.log({parent,childCategories, isLoading})
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
        {isLoading
          ? [1, 2, 3, 4, 5, 6, ].map((index) => (
              <div className='animate-pulse' key={index}>
                <div className='rounded-full h-32 w-32 bg-red-200 mx-auto mb-3' />
                <div className='h-5 w-40 rounded-md bg-red-200' />
              </div>
            ))
          : childCategories.map((item, index) => {
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
            })}
      </div>
    </section>
  );
}

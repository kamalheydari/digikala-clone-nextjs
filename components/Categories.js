import Image from "next/image";
import Link from "next/link";

export default function Categories({ children, childCategories, homePage }) {
  return (
    <section className='px-3'>
      <h4 className='mb-3 text-xl text-center'>{children}</h4>
      <div className='flex flex-wrap justify-center gap-4 mx-auto space-x-4 w-fit'>
        {childCategories.map((item, index) => {
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

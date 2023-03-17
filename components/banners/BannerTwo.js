import Image from 'next/image'

import { useGetSingleBannerQuery } from 'services'

export default function Bannertwo({ id }) {
  //? Get Banners Query
  const { data } = useGetSingleBannerQuery({
    id,
  })
  if (data?.banners && data.banners.length > 0) {
    return (
      <section className='grid grid-cols-2 gap-3 px-3 lg:grid-cols-4 lg:gap-4'>
        {data.banners
          .filter((item) => item.public && item.type === 'two')
          .map((item, index) => (
            <div
              className='relative h-[30vw] lg:h-60 w-full rounded-xl overflow-hidden'
              key={index}
              title={item.title}
            >
              {item.uri.length > 0 ? (
                <a href=''>
                  <Image
                    src={item.image.url}
                    layout='fill'
                    alt='Banner'
                    placeholder='blur'
                    blurDataURL='/placeholder.png'
                  />
                </a>
              ) : (
                <Image
                  src={item.image.url}
                  layout='fill'
                  alt='Banner'
                  placeholder='blur'
                  blurDataURL='/placeholder.png'
                />
              )}
            </div>
          ))}
      </section>
    )
  }
  return null
}

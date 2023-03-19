import { ResponsiveImage } from 'components'

import { useGetSingleBannerQuery } from 'services'

export default function Bannertwo({ id }) {
  //? Get Banners Query
  const { data } = useGetSingleBannerQuery({
    id,
  })

  //? Local components
  const BannerImage = ({ item }) => (
    <ResponsiveImage
      dimensions='h-[30vw] lg:h-60 w-full'
      className='rounded-xl overflow-hidden'
      src={item.image.url}
      alt={item.title}
    />
  )

  if (data?.banners && data.banners.length > 0) {
    return (
      <section className='grid grid-cols-2 gap-3 px-3 lg:grid-cols-4 lg:gap-4'>
        {data.banners
          .filter((item) => item.public && item.type === 'two')
          .map((item, index) =>
            item.uri.length > 0 ? (
              <a href={item.uri} target='_blank' key={index}>
                <BannerImage item={item} />
              </a>
            ) : (
              <BannerImage key={index} item={item} />
            )
          )}
      </section>
    )
  }
  return null
}

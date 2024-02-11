import { ResponsiveImage } from '@/components/ui'

import type { IBanner } from '@/types'

interface Props {
  data: IBanner[]
}

const SmallBanner: React.FC<Props> = (props) => {
  // ? Props
  const { data } = props

  // ? Local components
  const BannerImage = ({ item }: { item: IBanner }) => (
    <ResponsiveImage
      dimensions="h-[30vw] lg:h-60 w-full"
      className="overflow-hidden rounded-xl"
      src={item.image.url}
      alt={item.title}
      blurDataURL={item.image.placeholder}
    />
  )

  // ? Render(s)
  if (data.length === 0) return null

  return (
    <section className="grid grid-cols-2 gap-3 px-3 lg:grid-cols-4 lg:gap-4">
      {data.map((item, index) =>
        item.uri ? (
          <a href={item.uri} target="_blank" key={index}>
            <BannerImage item={item} />
          </a>
        ) : (
          <BannerImage key={index} item={item} />
        )
      )}
    </section>
  )
}

export default SmallBanner

import { ResponsiveImage } from '@/components/ui'

import type { IBanner } from '@/types'

interface Props {
  data: IBanner[]
}

const LargeBanner: React.FC<Props> = (props) => {
  // ? Props
  const { data } = props

  // ? Local components
  const BannerImage = ({ item, index }: { item: IBanner; index: number }) => (
    <ResponsiveImage
      dimensions="h-[40vw] lg:h-72 w-full"
      className={`overflow-hidden rounded-2xl ${
        index === 0
          ? 'lg:rounded-none lg:rounded-tr-2xl'
          : index === 1
            ? 'lg:rounded-none lg:rounded-tl-2xl'
            : index === 2
              ? 'lg:rounded-none lg:rounded-br-2xl'
              : 'lg:rounded-none lg:rounded-bl-2xl'
      }`}
      src={item.image.url}
      blurDataURL={item.image.placeholder}
      alt={item.title}
    />
  )

  // ? Render(s)
  if (data.length === 0) return null

  return (
    <section className="grid gap-3 px-3 lg:relative lg:grid-cols-2 lg:gap-4">
      {data.map((item, index) =>
        item.uri ? (
          <a href={item.uri} target="_blank" key={index}>
            <BannerImage item={item} index={index} />
          </a>
        ) : (
          <BannerImage key={index} item={item} index={index} />
        )
      )}
      <div className="absolute inset-1/2 z-10 hidden h-16 w-16 -translate-y-1/2 translate-x-1/2 rounded-full bg-white lg:block" />
    </section>
  )
}

export default LargeBanner

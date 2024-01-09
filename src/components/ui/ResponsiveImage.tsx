import Image, { ImageProps } from 'next/image'

import { customeBlurDataURL } from 'utils'

interface Props extends Omit<ImageProps, 'placeholder' | 'quality' | 'layout'> {
  dimensions?: string
  imageStyles?: string
}

const ResponsiveImage: React.FC<Props> = (props) => {
  // ? Props
  const { dimensions, className, src, alt, imageStyles, blurDataURL, ...restProps } = props

  // ? Render(s)
  return (
    <div className={`relative ${dimensions ?? ''} ${className ?? ''}`} title={alt}>
      <Image
        src={src}
        alt={alt}
        className={imageStyles}
        placeholder="blur"
        blurDataURL={blurDataURL ? 'data:image/png;base64,' + blurDataURL : customeBlurDataURL}
        quality="100"
        fill
        {...restProps}
      />
    </div>
  )
}

export default ResponsiveImage

import Image from 'next/image'

export default function ResponsiveImage(props) {
  //? Props
  const { dimensions, className, src, alt, imageStyles, ...rest } = props

  return (
    <div
      className={`relative ${dimensions} ${className}`}
      title={alt}
      {...rest}
    >
      <Image
        src={src}
        alt={alt}
        className={imageStyles}
        placeholder='blur'
        blurDataURL='/placeholder.png'
        fill
      />
    </div>
  )
}

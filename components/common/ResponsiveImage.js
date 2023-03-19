import Image from 'next/image'

export default function ResponsiveImage(props) {
  //? Props
  const { dimensions, className, src, alt, ...rest } = props

  return (
    <div
      className={`relative ${dimensions} ${className}`}
      title={alt}
      {...rest}
    >
      <Image
        src={src}
        alt={alt}
        placeholder='blur'
        blurDataURL='/placeholder.png'
        fill
      />
    </div>
  )
}

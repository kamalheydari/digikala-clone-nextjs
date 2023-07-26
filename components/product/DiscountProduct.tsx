export default function DiscountProduct({ discount }: { discount: number }) {
  return (
    <span className='farsi-digits bg-red-500 inline-block pt-0.5 px-2 text-white rounded-xl tracking-widest'>
      {discount}%
    </span>
  )
}

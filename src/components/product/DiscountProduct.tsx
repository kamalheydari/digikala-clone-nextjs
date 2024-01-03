export default function DiscountProduct({ discount }: { discount: number }) {
  return (
    <span className="farsi-digits inline-block rounded-xl bg-red-500 px-2 pt-0.5 tracking-widest text-white">
      {discount}%
    </span>
  )
}

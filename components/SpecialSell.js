import Image from "next/image";

export default function SpecialSell({ product }) {
  if (product.discount > 0 && product.inStock !== 0)
    {return (
      <div className='relative w-16 h-7'>
        <Image src='/icons/specialSell.svg' layout='fill' />
      </div>
    )}else{
      return(<div className='h-7'/>)
    }
}

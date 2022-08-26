import Image from "next/image";

export default function SpecialSell({ discount, inStock }) {
  if (discount > 0 && inStock !== 0) {
    return (
      <div className='relative w-16 h-7'>
        <Image src='/icons/specialSell.svg' layout='fill' alt="فروش ویژه"/>
      </div>
    );
  } else {
    return <div className='h-7' />;
  }
}

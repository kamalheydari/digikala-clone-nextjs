import Image from "next/image";

export default function EmptyOrdersList() {
  return (
    <div className='py-20'>
    <div className='relative mx-auto h-52 w-52'>
      <Image src='/icons/order-empty.svg' layout='fill' alt="بدون سفارش"/>
    </div>
    <p className='text-center'>هنوز هیچ سفارشی ندادید</p>
  </div>
  );
}

import Image from "next/image";

export default function EmptyCommentsList() {
  return (
    <div className='py-20'>
      <div className='relative mx-auto h-52 w-52'>
        <Image src='/icons/order-empty.svg' layout='fill' />
      </div>

      <p className='text-center'>هنوز هیچ نظری ندارید</p>
    </div>
  );
}

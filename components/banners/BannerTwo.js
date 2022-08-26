import Image from "next/image";

export default function Bannertwo({ images = [] }) {
  return (
    <section className='grid grid-cols-2 gap-3 px-3 lg:grid-cols-4 lg:gap-4'>
      {images.map((item, index) => (
        <div
          className='relative h-[30vw] lg:h-52 w-full rounded-xl overflow-hidden'
          key={index}
        >
          <Image src={item} layout='fill' alt="Banner"/>
        </div>
      ))}
    </section>
  );
}

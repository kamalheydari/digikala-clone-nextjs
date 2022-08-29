import Image from "next/image";

export default function BannerOne({ images = [] }) {
  return (
    <section className='grid gap-3 px-3 lg:relative lg:grid-cols-2 lg:gap-4'>
      {images.map((item, index) => (
        <div
          className={`relative h-[40vw] lg:h-72 w-full rounded-2xl overflow-hidden ${
            index === 0
              ? "lg:rounded-none lg:rounded-tr-2xl"
              : index === 1
              ? "lg:rounded-none lg:rounded-tl-2xl"
              : index === 2
              ? "lg:rounded-none lg:rounded-br-2xl"
              : "lg:rounded-none lg:rounded-bl-2xl"
          }`}
          key={index}
        >
          <Image
            src={item}
            layout='fill'
            alt='Banner'
            placeholder='blur'
            blurDataURL='/placeholder.png'
          />
        </div>
      ))}
      <div className='absolute z-10 hidden w-16 h-16 translate-x-1/2 -translate-y-1/2 bg-white rounded-full inset-1/2 lg:block' />
    </section>
  );
}

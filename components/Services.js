import Image from "next/image";
import { services } from "utils/constatns";

export default function Services() {
  return (
    <section className='hidden py-5 border-t border-b-2 border-gray-200 lg:flex justify-evenly'>
      {services.map((item, i) => (
        <div key={i} className='flex items-center gap-x-1'>
          <div className='relative w-10 h-10'>
            <Image src={item.img} layout='fill' />
          </div>
          <span className='text-xs'>{item.name}</span>
        </div>
      ))}
    </section>
  );
}

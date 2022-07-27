import Image from "next/image";
import { useRouter } from "next/router";

import { closeModal } from "app/slices/modal.slice";

export default function RedirectToLogin({ text, title, dispatch }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
    dispatch(closeModal());
  };

  return (
    <div className='p-3 space-y-4 text-center bg-white md:rounded-lg'>
      <div className='relative w-20 h-20 mx-auto'>
        <Image src='/icons/exclamation.svg' layout='fill' />
      </div>
      <p className='text-xl font-bold'>{title}</p>
      <p className='text-red-600'>{text}</p>
      <button type='button' className='mx-auto btn' onClick={handleClick}>
        انتقال به صفحه ورود
      </button>
    </div>
  );
}

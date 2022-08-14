import Image from "next/image";
import { useRouter } from "next/router";

import { closeModal } from "app/slices/modal.slice";

import { ModalWrapper } from "components";

export default function RedirectToLogin({ text, title, dispatch, isShow }) {
  const router = useRouter();

  const handleClick = () => {
    router.push("/login");
    dispatch(closeModal());
  };

  return (
    <ModalWrapper isShow={isShow}>
      <div
        className={`
  ${
    isShow ? "top-40 transform scale-100" : "top-40 transform scale-50 "
  } max-w-3xl 
   fixed transition-all duration-700 left-0 right-0 mx-auto z-40`}
      >
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
      </div>
    </ModalWrapper>
  );
}

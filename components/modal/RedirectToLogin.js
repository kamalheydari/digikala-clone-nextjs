import { closeModal } from "app/slices/modalSlice";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
export default function RedirectToLogin({ text, title }) {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClick = () => {
    router.push("/login");
    dispatch(closeModal());
  };

  return (
    <div className='bg-white p-3 text-center space-y-4 md:rounded-lg'>
      <div className='relative h-20 w-20 mx-auto'>
        <Image src='/icons/exclamation.svg' layout='fill' />
      </div>
      <h4 className='font-bold text-xl'>{title}</h4>
      <p className='text-red-600'>{text}</p>
      <button type='button' className='btn mx-auto' onClick={handleClick}>
        انتقال به صفحه ورود
      </button>
    </div>
  );
}

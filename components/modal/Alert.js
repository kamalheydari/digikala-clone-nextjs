import { useEffect } from "react";
import Image from "next/image";

import { closeModal } from "app/slices/modalSlice";

export default function Alert({ isShow, status, text, dispatch }) {
  let IconSrc;
  switch (status) {
    case "error":
      IconSrc = "/icons/error.svg";
      break;
    case "success":
      IconSrc = "/icons/success.svg";
      break;
    case "exclamation":
      IconSrc = "/icons/exclamation.svg";
      break;
    case "question":
      IconSrc = "/icons/question.svg";
      break;
    default:
      IconSrc = "/icons/exclamation.svg";
      break;
  }

  useEffect(() => {
    if (isShow) {
      const timeout = setTimeout(() => {
        dispatch(closeModal());
      }, 2000);
      return () => clearTimeout(timeout);
    }
  }, [isShow]);

  return (
    <div className='p-3 mx-2 text-center bg-white rounded-md shadow h-fit'>
      <div className='relative w-20 h-20 mx-auto '>
        <Image src={IconSrc} layout='fill' />
      </div>
      <p className='mt-2'>{text}</p>
    </div>
  );
}

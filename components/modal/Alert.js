import { closeModal } from "app/slices/modalSlice";
import Image from "next/image";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Alert({ isShow, status, text }) {
  const dispatch = useDispatch();

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
    const timeout = setTimeout(() => {
      dispatch(closeModal());
    }, 2000);
    return () => clearTimeout(timeout);
  }, [isShow]);

  return (
    
    <>
      <div className='relative h-20 w-20 mx-auto '>
        <Image src={IconSrc} layout='fill' />
      </div>
      <p className='mt-2'>{text}</p>
    </>
  );
}

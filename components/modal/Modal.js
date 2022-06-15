import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "app/slices/modalSlice";

//? Components
import Alert from "./Alert";

export default function Modal() {
  const dispatch = useDispatch();

  const { type, text, status, isShow } = useSelector((state) => state.modal);

  let renderModal;
  switch (type) {
    case "alert":
      renderModal = <Alert text={text} status={status} isShow={isShow} />;
      break;

    default:
      break;
  }

  return (
    <div
      className={`${
        isShow ? "opacity-100 visible" : "opacity-0 invisible "
      } transition-all duration-1000`}
    >
      <div
        className='fixed z-10 top-0 left-0 w-full h-full bg-gray-400/20'
        onClick={() => dispatch(closeModal())}
      />
      <div
        className={`
      ${isShow ? "top-40 " : "-top-full "}
      bg-white rounded-md p-3 text-center shadow absolute transition-all duration-700 left-0 right-0 max-w-md mx-auto z-20 h-fit `}
      >
        {renderModal}
      </div>
    </div>
  );
}

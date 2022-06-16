import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "app/slices/modalSlice";

//? Components
import Alert from "./Alert";
import RedirectToLogin from "./RedirectToLogin";

export default function Modal() {
  const dispatch = useDispatch();

  const { type, text, status, isShow, title } = useSelector(
    (state) => state.modal
  );

  //? Config Modal
  let renderModal;
  let effect = [];
  let size = "";
  switch (type) {
    case "alert":
      effect = ["top-40", "-top-full"];
      size = "max-w-md";
      renderModal = <Alert text={text} status={status} isShow={isShow} />;
      break;

    case "redirect":
      effect = ["top-40 transform scale-100", "top-40 transform scale-50 "];
      size = "max-w-3xl";
      renderModal = (
        <RedirectToLogin text={text} title={title} isShow={isShow} />
      );
      break;

    default:
      break;
  }

  return (
    <div
      className={`${
        isShow ? "opacity-100 visible" : "opacity-0 invisible "
      } transition-all duration-500 relative  `}
    >
      <div
        className='fixed z-10 top-0 left-0 w-full h-full bg-gray-400/20'
        onClick={() => dispatch(closeModal())}
      />
      <div
        className={`
      ${isShow ? effect[0] : effect[1]} ${size}
       fixed transition-all duration-700  left-0 right-0 mx-auto z-40 `}
      >
        {renderModal}
      </div>
    </div>
  );
}

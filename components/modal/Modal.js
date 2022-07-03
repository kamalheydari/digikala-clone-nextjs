import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "app/slices/modalSlice";

//? Components
import {
  Alert,
  RedirectToLogin,
  NameForm,
  MobileForm,
  AddressForm,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  CategoryForm,
} from "components";

export default function Modal() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.auth);

  const {
    type,
    text,
    status,
    isShow,
    title,
    isConfirm,
    id,
    editedData,
  } = useSelector((state) => state.modal);

  //? Config Modal
  let renderModal;
  let effect = [];
  let size = "";
  switch (type) {
    case "alert":
      effect = ["top-40", "-top-full"];
      size = "max-w-md";
      renderModal = (
        <Alert
          text={text}
          status={status}
          isShow={isShow}
          dispatch={dispatch}
        />
      );
      break;

    case "redirect":
      effect = ["top-40 transform scale-100", "top-40 transform scale-50 "];
      size = "max-w-3xl";
      renderModal = (
        <RedirectToLogin text={text} title={title} dispatch={dispatch} />
      );
      break;

    case "confirm-delete-user":
    case "confirm-delete-details":
    case "confirm-delete-product":
      effect = ["top-40 transform scale-100", "top-40 transform scale-50 "];
      size = "max-w-3xl";
      renderModal = (
        <ConfirmDeleteModal
          title={title}
          isConfirm={isConfirm}
          id={id}
          type={type}
          token={token}
          dispatch={dispatch}
        />
      );
      break;

    case "confirm-update-details":
    case "confirm-update-product":
      effect = ["top-40 transform scale-100", "top-40 transform scale-50 "];
      size = "max-w-3xl";
      renderModal = (
        <ConfirmUpdateModal
          title={title}
          isConfirm={isConfirm}
          id={id}
          type={type}
          token={token}
          editedData={editedData}
          dispatch={dispatch}
        />
      );
      break;

    case "edit-name":
      effect = ["bottom-0 lg:top-44", "-bottom-full lg:top-60"];
      size = "w-full h-screen lg:h-fit lg:max-w-3xl";
      renderModal = (
        <NameForm
          title={title}
          token={token}
          dispatch={dispatch}
          closeModal={closeModal}
        />
      );
      break;

    case "edit-category":
      effect = ["bottom-0 lg:top-20", "-bottom-full lg:top-28"];
      size = "w-full h-screen lg:h-fit lg:max-w-3xl";
      renderModal = (
        <CategoryForm
          title={title}
          token={token}
          dispatch={dispatch}
          closeModal={closeModal}
        />
      );
      break;

    case "edit-mobile":
      effect = ["bottom-0 lg:top-44", "-bottom-full lg:top-60"];
      size = "w-full h-screen lg:h-fit lg:max-w-3xl";
      renderModal = (
        <MobileForm
          title={title}
          token={token}
          dispatch={dispatch}
          closeModal={closeModal}
        />
      );
      break;

    case "edit-address":
      effect = ["bottom-0 lg:top-44", "-bottom-full lg:top-60"];
      size = "w-full h-screen lg:h-fit lg:max-w-3xl";
      renderModal = (
        <AddressForm
          title={title}
          token={token}
          dispatch={dispatch}
          closeModal={closeModal}
        />
      );
      break;

    default:
      break;
  }

  return (
    <div
      className={`${
        isShow ? "opacity-100 visible" : "opacity-0 invisible "
      } transition-all duration-500 relative   `}
    >
      <div
        className='fixed top-0 left-0 z-10 w-full h-full bg-gray-400/20'
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

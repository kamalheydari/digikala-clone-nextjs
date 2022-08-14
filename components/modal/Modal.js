import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "app/slices/modal.slice";

//? Components
import {
  RedirectToLogin,
  NameForm,
  MobileForm,
  AddressForm,
  ConfirmDeleteModal,
  ConfirmUpdateModal,
  CategoryForm,
  CommentModal,
  SearchModal,
} from "components";

export default function Modal() {
  const dispatch = useDispatch();

  const { token } = useSelector((state) => state.user);

  const { type, text, isShow, title, isConfirm, id, editedData } = useSelector(
    (state) => state.modal
  );

  return (
    <>
      <RedirectToLogin
        isShow={type === "redirect" && true}
        text={text}
        title={title}
        dispatch={dispatch}
      />
      <ConfirmDeleteModal
        title={title}
        isConfirm={isConfirm}
        id={id}
        type={type}
        token={token}
        dispatch={dispatch}
        isShow={type.includes("confirm-delete")}
      />
      <ConfirmUpdateModal
        title={title}
        isConfirm={isConfirm}
        id={id}
        type={type}
        token={token}
        editedData={editedData}
        dispatch={dispatch}
        isShow={type.includes("confirm-update")}
      />
      <NameForm
        title={title}
        token={token}
        dispatch={dispatch}
        closeModal={closeModal}
        editedData={editedData}
        isShow={type === "edit-name"}
      />
      <CommentModal
        title={title}
        token={token}
        dispatch={dispatch}
        closeModal={closeModal}
        id={id}
        isShow={type === "comment"}
      />
      <CategoryForm
        title={title}
        token={token}
        dispatch={dispatch}
        closeModal={closeModal}
        isShow={type === "edit-category"}
      />
      <MobileForm
        title={title}
        token={token}
        dispatch={dispatch}
        closeModal={closeModal}
        editedData={editedData}
        isShow={type === "edit-mobile"}
      />
      <AddressForm
        title={title}
        token={token}
        dispatch={dispatch}
        closeModal={closeModal}
        isShow={type === "edit-address"}
      />
      <SearchModal
        dispatch={dispatch}
        closeModal={closeModal}
        isShow={type === "search"}
      />
    </>
  );
}

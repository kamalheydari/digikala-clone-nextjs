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
import { useRouter } from "next/router";

export default function Modal() {
  const dispatch = useDispatch();
  const { route } = useRouter();

  //? Store
  const { token } = useSelector((state) => state.user);
  const { type, text, isShow, title, isConfirm, id, editedData } = useSelector(
    (state) => state.modal
  );

  return (
    <>
      <RedirectToLogin
        isShow={isShow && type === "redirect"}
        text={text}
        title={title}
        dispatch={dispatch}
      />

      {(route === "/admin/users" ||
        route === "/admin/details/[id]" ||
        route === "/admin/products" ||
        route === "/profile/reviews") && (
        <ConfirmDeleteModal
          title={title}
          isConfirm={isConfirm}
          id={id}
          type={type}
          token={token}
          dispatch={dispatch}
          isShow={isShow}
        />
      )}

      {(route === "/admin/product/[[...id]]" ||
        route == "/admin/details/[id]") && (
        <ConfirmUpdateModal
          title={title}
          isConfirm={isConfirm}
          id={id}
          type={type}
          token={token}
          editedData={editedData}
          dispatch={dispatch}
          isShow={isShow && type.includes("confirm-update")}
        />
      )}

      {route === "/profile/personal-info" && (
        <>
          <NameForm
            title={title}
            token={token}
            dispatch={dispatch}
            closeModal={closeModal}
            editedData={editedData}
            isShow={isShow && type === "edit-name"}
          />

          <MobileForm
            title={title}
            token={token}
            dispatch={dispatch}
            closeModal={closeModal}
            editedData={editedData}
            isShow={isShow && type === "edit-mobile"}
          />
        </>
      )}

      {route === "/products/[id]" && (
        <CommentModal
          title={title}
          token={token}
          dispatch={dispatch}
          closeModal={closeModal}
          id={id}
          isShow={isShow && type === "comment"}
        />
      )}

      {route === "/admin/categories" && (
        <CategoryForm
          title={title}
          token={token}
          dispatch={dispatch}
          closeModal={closeModal}
          isShow={isShow && type === "edit-category"}
        />
      )}
      {(route.includes("/profile/") ||
        route.includes("/checkout/") ||
        route === "/" ||
        route === "/main/[category]" ||
        route === "/products" ||
        route === "/products/[id]") && (
        <AddressForm
          title={title}
          token={token}
          dispatch={dispatch}
          closeModal={closeModal}
          isShow={isShow && type === "edit-address"}
        />
      )}
      {(route.includes("/profile") ||
        route === "/checkout/cart" ||
        route === "/" ||
        route === "/main/[category]" ||
        route === "/products" ||
        route === "/products/[id]") && (
        <SearchModal
          dispatch={dispatch}
          closeModal={closeModal}
          isShow={isShow && type === "search"}
        />
      )}
    </>
  );
}

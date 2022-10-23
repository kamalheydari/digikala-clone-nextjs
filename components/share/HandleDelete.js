import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "app/slices/alert.slice";
import { resetDetails } from "app/slices/details.slice";
import { confirmReset } from "app/slices/modal.slice";

export default function HandleDelete({
  deleteFunc,
  isSuccess,
  isError,
  error,
  data,
}) {
  const dispatch = useDispatch();

  //? Store
  const { isConfirmDelete, id, type } = useSelector((state) => state.modal);

  //? Send Request
  useEffect(() => {
    if (isConfirmDelete) {
      deleteFunc({
        id,
      });
    }
  }, [isConfirmDelete]);

  //? Handle Response
  useEffect(() => {
    if (isSuccess) {
      if (type === "confirm-delete-details") dispatch(resetDetails());
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
      dispatch(confirmReset());
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError) {
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
      dispatch(confirmReset());
    }
  }, [isError]);

  return null;
}

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";
import { showAlert } from "app/slices/alert.slice";
import { confirmReset } from "app/slices/modal.slice";

export default function HandleUpdate({
  updateFunc,
  isSuccess,
  isError,
  error,
  data,
}) {
  const dispatch = useDispatch();

  //? Store
  const { isConfirmUpdate, id, editedData } = useSelector(
    (state) => state.modal
  );

  //? Send Request
  useEffect(() => {
    if (isConfirmUpdate) {
      updateFunc({
        id,
        body: { ...editedData },
      });
    }
  }, [isConfirmUpdate]);

  //? Handle Response
  useEffect(() => {
    if (isSuccess) {
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
          title: error.data.err,
        })
      );
      dispatch(confirmReset());
    }
  }, [isError]);

  return null;
}

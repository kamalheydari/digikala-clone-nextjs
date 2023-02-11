import { useDispatch } from "react-redux";
import { AddressForm, Icons } from "components";

import { openModal } from "app/slices/modal.slice";
import useUserInfo from "hooks/useUserInfo";

function AddressBar() {
  const { userInfo, isVerify, isLoading } = useUserInfo();

  const dispatch = useDispatch();

  //? Handlers
  const handleClick = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-address",
        title: "ثبت و ویرایش آدرس",
      })
    );
  };

  if (isLoading)
    return (
      <div className='animate-pulse h-5 w-3/4 rounded-md bg-red-200 lg:w-1/4 lg:h-6' />
    );

  return (
    <>
      <AddressForm />

      {!isVerify ? null : userInfo?.address ? (
        <button
          type='button'
          onClick={handleClick}
          className='flex items-center w-full gap-x-1 lg:w-fit'
        >
          <Icons.Location2 className='icon' />
          <span>
            ارسال به {userInfo.address.province.name}, {userInfo.address.city.name}
          </span>
          <Icons.ArrowLeft className='mr-auto icon' />
        </button>
      ) : (
        <button
          type='button'
          onClick={handleClick}
          className='flex items-center w-full gap-x-1 lg:w-fit'
        >
          <Icons.Location2 className='icon' />
          <span>لطفا شهر خود را انتخاب کنید</span>

          <Icons.ArrowLeft className='mr-auto icon' />
        </button>
      )}
    </>
  );
}

export default AddressBar;

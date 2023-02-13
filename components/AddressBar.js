import { useDispatch } from "react-redux";
import { AddressForm, Icons, Skeleton } from "components";

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
  
  //? Render
  if (!isVerify) {
    return null;
  } else if (isLoading) {
    return (
      <Skeleton.Item
        animated='background'
        height='h-5 lg:h-6'
        width='w-3/4 lg:w-1/4'
      />
    );
  } else if (!userInfo.address) {
    return (
      <>
        <AddressForm />

        <button
          type='button'
          onClick={handleClick}
          className='flex items-center w-full gap-x-1 lg:w-fit'
        >
          <Icons.Location2 className='icon' />
          <span>لطفا شهر خود را انتخاب کنید</span>

          <Icons.ArrowLeft className='mr-auto icon' />
        </button>
      </>
    );
  } else if (userInfo?.address) {
    return (
      <>
        <AddressForm />

        <button
          type='button'
          onClick={handleClick}
          className='flex items-center w-full gap-x-1 lg:w-fit'
        >
          <Icons.Location2 className='icon' />
          <span>
            ارسال به {userInfo.address.province.name},{" "}
            {userInfo.address.city.name}
          </span>
          <Icons.ArrowLeft className='mr-auto icon' />
        </button>
      </>
    );
  }
}

export default AddressBar;

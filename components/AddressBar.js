import { Icons, Skeleton } from "components";

import { withAddressModal } from "HOCs/withAddressModal";

import useUserInfo from "hooks/useUserInfo";

function AddressBar({ openAddressModal }) {
  //? Get User Data
  const { userInfo, isVerify, isLoading } = useUserInfo();

  //? Render(s)
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
      <button
        type='button'
        onClick={openAddressModal}
        className='flex items-center w-full gap-x-1 lg:w-fit'
      >
        <Icons.Location2 className='icon' />
        <span>لطفا شهر خود را انتخاب کنید</span>

        <Icons.ArrowLeft className='mr-auto icon' />
      </button>
    );
  } else if (userInfo?.address) {
    return (
      <button
        type='button'
        onClick={openAddressModal}
        className='flex items-center w-full gap-x-1 lg:w-fit'
      >
        <Icons.Location2 className='icon' />
        <span>
          ارسال به {userInfo.address.province.name},{" "}
          {userInfo.address.city.name}
        </span>
        <Icons.ArrowLeft className='mr-auto icon' />
      </button>
    );
  }
}

export default withAddressModal(AddressBar);

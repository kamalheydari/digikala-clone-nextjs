import Image from "next/image";
import { openModal } from "app/slices/modalSlice";
import { BackButton, Icons } from "components";
import { useDispatch, useSelector } from "react-redux";

export default function Addresses() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const edditAddressHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-address",
        title: "ثبت و ویرایش آدرس",
      })
    );
  };

  return (
    <div>
      <BackButton>آدرس‌ها</BackButton>
      <div className='section-divide-y' />
      {user.address ? (
        <div className='flex-1 px-5 '>
          <div className='flex justify-between py-4 border-b border-gray-200'>
            <p>{user.address.street}</p>
            <Icons.Edit
              className='cursor-pointer icon'
              onClick={edditAddressHandler}
            />
          </div>
          <div className='my-2 space-y-3 text-gray-500'>
            <div className='flex items-center gap-x-2 '>
              <Icons.UserLocation className='text-gray-500 icon' />
              <span>
                {user.address.provinces}, {user.address.city}
              </span>
            </div>
            <div className='flex items-center gap-x-2 '>
              <Icons.Post className='text-gray-500 icon' />
              <span>{user.address.postalCode}</span>
            </div>
            <div className='flex items-center gap-x-2 '>
              <Icons.User className='text-gray-500 icon' />
              <span>{user.name}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className='flex flex-col items-center py-20 gap-y-4'>
          <div className='relative h-52 w-52'>
            <Image src='/icons/address.svg' layout='fill' />
          </div>
          <p>هنوز آدرس ثبت نکرده‌اید.</p>

          <button
            className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg gap-x-3'
            onClick={edditAddressHandler}
          >
            <Icons.Location className='text-red-600 icon' />
            <span>ثبت آدرس</span>
          </button>
        </div>
      )}
    </div>
  );
}
Addresses.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};

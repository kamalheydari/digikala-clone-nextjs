import Image from "next/image";
import Link from "next/link";
import { Icons, User, Cart, Search, Sidebar, Navbar } from "components";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/slices/modal.slice";
import useToggle from "hooks/useToggle";

export default function Header() {
  const dispatch = useDispatch();

  const { status: isSidebar, toggleStatus: toggleSidebar } = useToggle();

  //? Store
  const { userInfo } = useSelector((state) => state.user);

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

  return (
    <header className='px-4 bg-white lg:shadow xl:fixed xl:z-20 xl:top-0 xl:left-0 xl:right-0'>
      <div className='container max-w-[1700px] lg:flex lg:py-2 '>
        <div className='inline-flex items-center justify-between w-full border-b lg:border-b-0 lg:max-w-min lg:ml-8'>
          <button
            className='p-1 lg:hidden'
            type='button'
            onClick={toggleSidebar}
          >
            <Icons.Bars className='icon' />
          </button>
          <div className='relative w-24 h-14 '>
            <Link passHref href='/'>
              <a>
                <Image src='/icons/logo.svg' layout='fill' alt='دیجی‌کالا' />
              </a>
            </Link>
          </div>
          <Icons.Question className='icon lg:hidden' />
        </div>
        <div className='inline-flex items-center justify-between w-full py-2 border-b gap-x-10 lg:border-b-0'>
          <Search />
          <div className='inline-flex items-center gap-x-2'>
            <User user={userInfo} />
            <span className='hidden lg:block bg-gray-300 w-0.5 h-8' />
            <Cart />
          </div>
        </div>
      </div>
      <div className='py-2 flex justify-between mx-auto max-w-[1700px] relative'>
        <div className='hidden lg:block'>
          <Navbar />
        </div>

        {userInfo && userInfo?.address ? (
          <button
            type='button'
            onClick={handleClick}
            className='flex items-center w-full gap-x-1 lg:w-fit'
          >
            <Icons.Location2 className='icon' />
            <span>
              ارسال به {userInfo.address.provinces}, {userInfo.address.city}
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
      </div>
      <Sidebar isSidebar={isSidebar} toggleSidebar={toggleSidebar} />
    </header>
  );
}

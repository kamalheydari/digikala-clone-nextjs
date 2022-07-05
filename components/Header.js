import Image from "next/image";
import Link from "next/link";
import { Icons, User, Cart, Search, Sidebar, Navbar } from "components";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { openModal } from "app/slices/modalSlice";

export default function Header() {
  const dispatch = useDispatch();

  //? Local State
  const [isSidebar, setIsSidebar] = useState(false);

  //? Store
  const { user } = useSelector((state) => state.auth);

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
    <header className='px-4 lg:shadow'>
      <div className='container max-w-[1550px] lg:flex lg:py-2 '>
        <div className='inline-flex items-center justify-between w-full border-b lg:border-b-0 lg:max-w-min lg:ml-8'>
          <button
            className='p-1 lg:hidden'
            type='button'
            onClick={() => setIsSidebar(true)}
          >
            <Icons.Bars className='icon' />
          </button>
          <div className='relative w-24 h-14 '>
            <Link passHref href='/'>
              <a>
                <Image src='/icons/logo.svg' layout='fill' />
              </a>
            </Link>
          </div>
          <Icons.Question className='icon lg:hidden' />
        </div>
        <div className='inline-flex items-center justify-between w-full py-2 border-b gap-x-10 lg:border-b-0'>
          <Search />
          <div className='inline-flex items-center gap-x-4 '>
            <User user={user} />
            <span className='hiden lg:block lg:border lg:border-gray-300 lg:h-6'></span>
            <Cart />
          </div>
        </div>
      </div>
      <div className='py-2 flex justify-between mx-auto max-w-[1550px] relative'>
        <div className='hidden lg:block'>
          <Navbar />
        </div>

        <button
          type='button'
          onClick={handleClick}
          className='flex items-center w-full gap-x-1 lg:w-fit'
        >
          <Icons.Location2 className='icon' />
          {user?.address ? (
            <span>
              ارسال به {user.address.provinces}, {user.address.city}
            </span>
          ) : (
            <span>لطفا شهر خود را انتخاب کنید</span>
          )}
          <Icons.ArrowLeft className='mr-auto icon' />
        </button>
      </div>
      <Sidebar isSidebar={isSidebar} setIsSidebar={setIsSidebar} />
    </header>
  );
}

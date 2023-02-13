import Link from "next/link";

import { Icons, Skeleton, UserDropdown } from "components";

import useUserInfo from "hooks/useUserInfo";

function Signup() {
  const { userInfo, isVerify, isLoading } = useUserInfo();

  //? Render

  if (isLoading)
    return (
      <Skeleton.Item height='h-8' width='w-7 lg:w-12' animated='background' />
    );
  else if (!isVerify) {
    return (
      <div className='user-signup'>
        <Link href='/login'>
          <a className='flex-center gap-x-1'>
            <Icons.Login className='icon' />
            ورود
          </a>
        </Link>
        <span className='user-signup__divider' />
        <Link href='/register'>
          <a className='hidden px-2 lg:block'>ثبت‌نام</a>
        </Link>
      </div>
    );
  } else if (userInfo) {
    return (
      <>
        <div className='lg:hidden'>
          <Link href='/profile'>
            <a>
              <Icons.User className='icon h-7 w-7' />
            </a>
          </Link>
        </div>
        <div className='hidden lg:block'>
          <UserDropdown name={userInfo.name} />
        </div>
      </>
    );
  }
}

export default Signup;

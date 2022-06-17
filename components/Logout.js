import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userLogout } from "app/slices/authSlice";
import { Icons } from "components";
import { openModal } from "app/slices/modalSlice";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
    dispatch(userLogout());
    dispatch(
      openModal({
        isShow: true,
        type: "alert",
        status: "success",
        text: "خروج موفقیت آمیز بود",
      })
    );
  };
  return (
    <div className='px-3 transition-colors hover:bg-gray-200'>
      <div
        role='button'
        className='flex justify-between py-4 mx-4 text-gray-700 border-t border-gray-300 cursor-pointer gap-x-2'
        onClick={() => handleLogout()}
      >
        <Icons.Logout className='text-black icon' />
        <span className='ml-auto mr-3'>خروج از حساب کاربری</span>
      </div>
    </div>
  );
}

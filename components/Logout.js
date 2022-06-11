import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { userLogout } from "app/slices/authSlice";
import { Icons } from "components";
import alert from "utils/alert";

export default function Logout() {
  const dispatch = useDispatch();
  const router = useRouter();
  const handleLogout = () => {
    router.push("/");
    dispatch(userLogout());
    alert("success", "خروج موفقیت آمیز بود");
  };
  return (
    <div className='transition-colors hover:bg-gray-200 px-3'>

      <div role='button'
        className='flex justify-between cursor-pointer py-4 gap-x-2 mx-4  border-t border-gray-300'
        onClick={() => handleLogout()}
      >
        <Icons.Logout className='icon text-black' />
        <span className='ml-auto mr-3'>خروج از حساب کاربری</span>
      </div>
    </div>
  );
}

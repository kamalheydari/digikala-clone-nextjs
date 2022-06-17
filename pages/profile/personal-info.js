import { openModal } from "app/slices/modalSlice";
import { BackButton, Icons } from "components";
import { useDispatch, useSelector } from "react-redux";

export default function PersonalInfo() {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const mobilEditHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-mobile",
        title: "ثبت و ویرایش موبایل",
      })
    );
  };
  const nameEditHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-name",
        title: "ثبت و ویرایش اطلاعات شناسایی",
      })
    );
  };

  return (
    <div>
      <BackButton>اطلاعات حساب کاربری</BackButton>
      <div className='section-divide-y' />
      <div className='lg:flex'>
        <div className='px-5 flex-1'>
          <div className='flex justify-between py-4 border-b border-gray-200'>
            <p>{user.name}</p>
            {user.name ? (
              <Icons.Edit
                className='icon cursor-pointer'
                onClick={nameEditHandler}
              />
            ) : (
              <Icons.Plus
                className='icon cursor-pointer'
                onClick={nameEditHandler}
              />
            )}
          </div>
        </div>

        <div className='px-5 flex-1'>
          <div className='flex justify-between py-4 border-b border-gray-200'>
            <p>{user.mobile ? user.mobile : "شماره موبایل"}</p>
            {user.mobile ? (
              <Icons.Edit
                className='icon cursor-pointer'
                onClick={mobilEditHandler}
              />
            ) : (
              <Icons.Plus
                className='icon cursor-pointer'
                onClick={mobilEditHandler}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
PersonalInfo.getProfileLayout = function pageLayout(page) {
  return <>{page}</>;
};

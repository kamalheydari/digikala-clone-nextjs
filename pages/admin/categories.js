import { useDispatch, useSelector } from "react-redux";

import { openModal } from "app/slices/modalSlice";

import { BackButton } from "components";

export default function Categories() {
  const dispatch = useDispatch();

  //? Store
  const { categories } = useSelector((state) => state.categories);

  //? Handlers
  const categoryEditHandler = () => {
    dispatch(
      openModal({
        isShow: true,
        type: "edit-category",
        title: "ثبت و ویرایش دسته‌بندی",
      })
    );
  };

  return (
    <>
      <BackButton backRoute='/admin'>دسته بندی ها</BackButton>
      <div className='section-divide-y' />

      <div className='p-3'>
        <div className='text-white space-y-8'>
          <button
            className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg gap-x-3'
            onClick={categoryEditHandler}
          >
            افزودن دسته‌بندی جدید
          </button>
          <div className='text-gray-600  flex gap-x-3'>
            <p className='flex items-center text-sm gap-x-1'>
              <span className='w-6 h-6 rounded-md bg-red-500 inline-block' />
              دسته‌بندی اصلی
            </p>
            <p className='flex items-center text-sm gap-x-1'>
              <span className='w-6 h-6 rounded-md bg-green-500 inline-block' />
              دسته‌بندی والد
            </p>
            <p className='flex items-center text-sm gap-x-1'>
              <span className='w-6 h-6 rounded-md bg-blue-500 inline-block' />
              دسته‌بندی فرزند
            </p>
          </div>
          {categories.map((mainCategory) => {
            if (mainCategory.parent === "/") {
              return (
                <div key={mainCategory._id} className='p-2 shadow-lg'>
                  <div className='p-2 text-center bg-red-500 rounded'>
                    {mainCategory.name}
                  </div>
                  <div className='flex flex-wrap gap-x-4'>
                    {categories.map((parentCategory) => {
                      if (parentCategory.parent === mainCategory.category) {
                        return (
                          <div key={parentCategory._id} className='flex-1'>
                            <div className='p-2 mt-2 text-center bg-green-500 rounded'>
                              {parentCategory.name}
                            </div>
                            <div className='flex flex-wrap gap-x-4'>
                              {categories.map((childCategory) => {
                                if (
                                  childCategory.parent ===
                                  "/" + parentCategory.slug
                                ) {
                                  return (
                                    <div
                                      key={childCategory._id}
                                      className='flex-1'
                                    >
                                      <div className='flex-1 p-2 mt-2 text-center bg-blue-500 rounded'>
                                        {childCategory.name}
                                      </div>
                                    </div>
                                  );
                                }
                              })}
                            </div>
                          </div>
                        );
                      }
                    })}
                  </div>
                </div>
              );
            }
          })}
        </div>
      </div>
      <div className='py-20 '></div>
    </>
  );
}

Categories.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};

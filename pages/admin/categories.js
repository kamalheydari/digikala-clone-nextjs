import Head from "next/head";

import { useDispatch, useSelector } from "react-redux";
import { openModal } from "app/slices/modal.slice";

import { Buttons } from "components";

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
    <main>
      <Head>
        <title>مدیریت | دسته بندی ها</title>
      </Head>

      <Buttons.Back backRoute='/admin'>دسته بندی ها</Buttons.Back>
      <div className='section-divide-y' />

      <section className='p-3'>
        <div className='space-y-8 text-white'>
          <button
            className='flex items-center px-3 py-2 text-red-600 border-2 border-red-600 rounded-lg gap-x-3'
            onClick={categoryEditHandler}
          >
            افزودن دسته‌بندی جدید
          </button>
          <div className='flex text-gray-600 gap-x-3'>
            <p className='flex items-center text-sm gap-x-1'>
              <span className='inline-block w-6 h-6 bg-red-500 rounded-md' />
              دسته‌بندی اصلی
            </p>
            <p className='flex items-center text-sm gap-x-1'>
              <span className='inline-block w-6 h-6 bg-green-500 rounded-md' />
              دسته‌بندی والد
            </p>
            <p className='flex items-center text-sm gap-x-1'>
              <span className='inline-block w-6 h-6 bg-blue-500 rounded-md' />
              دسته‌بندی فرزند
            </p>
          </div>
          <ul className='space-y-8'>
            {categories.slice(0,2).map((mainCategory) => {
              if (mainCategory.parent === "/") {
                return (
                  <li
                    key={mainCategory._id}
                    className='p-2 border border-gray-100 rounded-md shadow'
                  >
                    <div className='p-2 text-center bg-red-500 rounded'>
                      {mainCategory.name}
                    </div>
                    <ul className='flex flex-wrap gap-x-4'>
                      {categories.map((parentCategory) => {
                        if (parentCategory.parent === mainCategory.category) {
                          return (
                            <li key={parentCategory._id} className='flex-1'>
                              <div className='p-2 mt-2 text-center bg-green-500 rounded'>
                                {parentCategory.name}
                              </div>
                              <ul className='flex flex-wrap gap-x-4'>
                                {categories.map((childCategory) => {
                                  if (
                                    childCategory.parent ===
                                    "/" + parentCategory.slug
                                  ) {
                                    return (
                                      <li
                                        key={childCategory._id}
                                        className='flex-1'
                                      >
                                        <div className='flex-1 p-2 mt-2 text-center bg-blue-500 rounded'>
                                          {childCategory.name}
                                        </div>
                                      </li>
                                    );
                                  }
                                })}
                              </ul>
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </li>
                );
              }
            })}
          </ul>
        </div>
      </section>
      <div className='py-20 '></div>
    </main>
  );
}

Categories.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>;
};

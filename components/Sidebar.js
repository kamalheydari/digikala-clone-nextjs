import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

import { useDispatch, useSelector } from "react-redux";
import {
  resetParentCategory,
  resetSelectedCategories,
} from "app/slices/category.slice";

import { Icons } from "components";

export default function Sidebar({ isSidebar, setIsSidebar }) {
  const dispatch = useDispatch();

  //? Local States
  const [mainExpandCat, setMainExpandCat] = useState("");
  const [parentExpandCat, setParentExpandCat] = useState("");

  //? Store
  const { categories } = useSelector((state) => state.categories);

  const parents = [...new Set(categories.map((item) => item.parent))];

  //? Handlers
  const handleClick = (cat) => {
    if (cat.parent === "/") {
      setMainExpandCat(cat.category);
    } else {
      setParentExpandCat("/" + cat.slug);
    }

    if (cat.category === mainExpandCat) setMainExpandCat("");
    if ("/" + cat.slug === parentExpandCat) setParentExpandCat("");
  };

  const hanldeClose = () => {
    setIsSidebar(false);
    dispatch(resetParentCategory());
    dispatch(resetSelectedCategories());
  };

  return (
    <div
      className={`w-full h-screen fixed bg-gray-100/50 duration-200 z-10 top-0 lg:hidden ${
        isSidebar ? "right-0" : "-right-full"
      } `}
    >
      <div className='z-10 w-full h-full' onClick={hanldeClose} />

      <div className='absolute top-0 right-0 z-20 w-3/4 h-screen max-w-sm space-y-4 bg-white'>
        <div className='relative h-10 p-4 m-4 ml-auto w-28'>
          <Image src='/icons/logoPersian.svg' layout='fill' alt='دیجی‌کالا' />
        </div>
        <p className='p-3 border-t-2 border-gray-200'>دسته‌بندی کالاها</p>
        <ul>
          {categories.slice(0, 2).map((mainCategory) => {
            if (mainCategory.parent === "/") {
              return (
                <li
                  key={mainCategory._id}
                  className='space-y-4 overflow-hidden text-sm md:text-base '
                >
                  <div
                    className={`flex items-center justify-between px-4 py-2 text-gray-600 ${
                      mainCategory.category === mainExpandCat && "text-red-400"
                    }`}
                  >
                    <Link href={`/main/${mainCategory.slug}`}>
                      <a
                        className='px-1 font-semibold tracking-wide'
                        onClick={hanldeClose}
                      >
                        {mainCategory.name}
                      </a>
                    </Link>

                    {parents.includes(mainCategory.category) && (
                      <button onClick={() => handleClick(mainCategory)}>
                        {mainCategory.category === mainExpandCat ? (
                          <Icons.ArrowUp className='text-red-400 w-7 h-7 bg-gray-50 rounded-2xl' />
                        ) : (
                          <Icons.ArrowDown className='text-gray-700 w-7 h-7 bg-gray-50 rounded-2xl' />
                        )}
                      </button>
                    )}
                  </div>
                  <ul>
                    {categories.map((parentCategory) => {
                      if (parentCategory.parent === mainCategory.category) {
                        return (
                          <li
                            key={parentCategory._id}
                            className={`overflow-hidden ${
                              parentCategory.parent === mainExpandCat
                                ? "h-auto"
                                : "h-0"
                            }`}
                          >
                            <div
                              className={`flex items-center justify-between bg-gray-100 px-6 py-2 text-gray-500 ${
                                "/" + parentCategory.slug === parentExpandCat &&
                                "text-red-400"
                              }`}
                            >
                              <Link
                                href={`/products?category=${parentCategory.slug}`}
                              >
                                <a
                                  className='px-1 font-medium'
                                  onClick={hanldeClose}
                                >
                                  {parentCategory.name}
                                </a>
                              </Link>
                              {parents.includes("/" + parentCategory.slug) && (
                                <button
                                  onClick={() => handleClick(parentCategory)}
                                >
                                  {"/" + parentCategory.slug ===
                                  parentExpandCat ? (
                                    <Icons.ArrowUp className='text-red-400 bg-gray-200 w-7 h-7 rounded-2xl' />
                                  ) : (
                                    <Icons.ArrowDown className='text-gray-700 bg-gray-200 w-7 h-7 rounded-2xl' />
                                  )}
                                </button>
                              )}
                            </div>
                            <ul>
                              {categories.map((childCategory) => {
                                if (
                                  childCategory.parent ===
                                  "/" + parentCategory.slug
                                ) {
                                  return (
                                    <li
                                      key={childCategory._id}
                                      className={`${
                                        childCategory.parent === parentExpandCat
                                          ? "h-auto bg-gray-100 px-8 py-2"
                                          : "h-0"
                                      }`}
                                    >
                                      <Link
                                        href={`/products?category=${childCategory.slug}`}
                                      >
                                        <a
                                          className='inline-block p-1 font-light text-gray-500'
                                          onClick={hanldeClose}
                                        >
                                          {childCategory.name}
                                        </a>
                                      </Link>
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
    </div>
  );
}

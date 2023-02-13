import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { Icons, Skeleton } from "components";

import useDisclosure from "hooks/useDisclosure";
import useCategory from "hooks/useCategory";

export default function Sidebar() {
  const [isSidebar, sidebarHandlers] = useDisclosure();

  useEffect(() => {
    if (isSidebar) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "unset";
  }, [isSidebar]);

  //? States
  const [mainExpandCat, setMainExpandCat] = useState("");
  const [parentExpandCat, setParentExpandCat] = useState("");

  const { categories, isLoading } = useCategory();
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
    sidebarHandlers.close();
    setMainExpandCat("");
    setParentExpandCat("");
  };

  //? Local Components
  const CategorySkeleton = () => (
    <Skeleton count={4}>
      <Skeleton.Items className='h-10 flex-center justify-between '>
        <Skeleton.Item animated='background' height='h-6' width='w-40' />
        <Skeleton.Item
          animated='background'
          height='h-7'
          width='w-7'
          className='rounded-full'
        />
      </Skeleton.Items>
    </Skeleton>
  );

  //? Render
  return (
    <>
      <button
        className='p-1 lg:hidden'
        type='button'
        onClick={sidebarHandlers.open}
      >
        <Icons.Bars className='icon' />
      </button>
      <div className={`sidebar ${isSidebar ? "right-0" : "-right-full"} `}>
        <div
          className={`${
            isSidebar
              ? "opacity-100 visible duration-300 delay-200"
              : "opacity-0 invisible "
          }  bg-gray-100/50  z-10 w-full h-full`}
          onClick={hanldeClose}
        />

        <div className='sidebar__content'>
          <Image
            src='/icons/logoPersian.svg'
            height={40}
            width={112}
            alt='دیجی‌کالا'
          />
          <h5 className='sidebar__title'>دسته‌بندی کالاها</h5>
          {isLoading ? (
            <CategorySkeleton />
          ) : (
            <ul>
              {categories.slice(0, 2).map((mainCategory) => {
                if (mainCategory.parent === "/") {
                  return (
                    <li
                      key={mainCategory._id}
                      className='space-y-4 overflow-hidden text-sm md:text-base '
                    >
                      <div
                        className={`sidebar__category text-gray-600 ${
                          mainCategory.category === mainExpandCat &&
                          "text-red-400"
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

                        {parents?.includes(mainCategory.category) && (
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
                                  className={` sidebar__category px-6 bg-gray-100  text-gray-500 ${
                                    "/" + parentCategory.slug ===
                                      parentExpandCat && "text-red-400"
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
                                  {parents?.includes(
                                    "/" + parentCategory.slug
                                  ) && (
                                    <button
                                      onClick={() =>
                                        handleClick(parentCategory)
                                      }
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
                                            childCategory.parent ===
                                            parentExpandCat
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
          )}
        </div>
      </div>
    </>
  );
}

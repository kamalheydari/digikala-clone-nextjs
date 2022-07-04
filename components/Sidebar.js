import Image from "next/image";
import { useSelector } from "react-redux";
import { Icons } from "components";
import { useState } from "react";
import Link from "next/link";

export default function Sidebar({ isSidebar, setIsSidebar }) {
  const [mainExpandCat, setMainExpandCat] = useState("");
  const [parentExpandCat, setParentExpandCat] = useState("");

  const { categories } = useSelector((state) => state.categories);

  const clickHandler = (cat) => {
    if (cat.parent === "/") {
      setMainExpandCat(cat.category);
    } else {
      setParentExpandCat("/" + cat.slug);
    }

    if (cat.category === mainExpandCat) setMainExpandCat("");
    if ("/" + cat.slug === parentExpandCat) setParentExpandCat("");
  };

  return (
    <div
      className={`w-full h-screen fixed bg-gray-100/50 duration-200 top-0 lg:hidden ${
        isSidebar ? "right-0" : "-right-full"
      } `}
    >
      <div className='z-10 w-full h-full' onClick={() => setIsSidebar(false)} />

      <div className='bg-white space-y-4 absolute w-3/4 max-w-sm h-screen top-0 right-0 z-20'>
        <div className='relative m-4 h-10 ml-auto w-28 p-4'>
          <Image src='/icons/logoPersian.svg' layout='fill' />
        </div>
        <p className='border-t-2 p-3 border-gray-200'>دسته‌بندی کالاها</p>
        <div>
          {categories.map((mainCategory) => {
            if (mainCategory.parent === "/") {
              return (
                <div
                  key={mainCategory._id}
                  className='overflow-hidden text-sm md:text-base space-y-6 '
                >
                  <div
                    className={`flex items-center justify-between px-4 py-2 ${
                      mainCategory.category === mainExpandCat && "text-red-400"
                    }`}
                  >
                    <Link href={`/products?category=${mainCategory.slug}`}>
                      <a className='px-1'>{mainCategory.name}</a>
                    </Link>
                    <button onClick={() => clickHandler(mainCategory)}>
                      {mainCategory.category === mainExpandCat ? (
                        <Icons.ArrowUp className='w-7 h-7 text-red-400 bg-gray-50 rounded-2xl' />
                      ) : (
                        <Icons.ArrowDown className='w-7 h-7 text-gray-700 bg-gray-50 rounded-2xl' />
                      )}
                    </button>
                  </div>
                  <div className=''>
                    {categories.map((parentCategory) => {
                      if (parentCategory.parent === mainCategory.category) {
                        return (
                          <div
                            key={parentCategory._id}
                            className={`overflow-hidden ${
                              parentCategory.parent === mainExpandCat
                                ? "h-auto"
                                : "h-0"
                            }`}
                          >
                            <div
                              className={`flex items-center justify-between bg-gray-100 px-6 py-2 ${
                                "/" + parentCategory.slug === parentExpandCat &&
                                "text-red-400"
                              }`}
                            >
                              <Link
                                href={`/products?category=${parentCategory.slug}`}
                              >
                                <a className='px-1'>{parentCategory.name}</a>
                              </Link>
                              <button
                                onClick={() => clickHandler(parentCategory)}
                              >
                                {"/" + parentCategory.slug ===
                                parentExpandCat ? (
                                  <Icons.ArrowUp className='w-7 h-7 text-red-400 bg-gray-200 rounded-2xl' />
                                ) : (
                                  <Icons.ArrowDown className='w-7 h-7 text-gray-700 bg-gray-200 rounded-2xl' />
                                )}
                              </button>
                            </div>
                            <div className=''>
                              {categories.map((childCategory) => {
                                if (
                                  childCategory.parent ===
                                  "/" + parentCategory.slug
                                ) {
                                  return (
                                    <div
                                      key={childCategory._id}
                                      className={`${
                                        childCategory.parent === parentExpandCat
                                          ? "h-auto"
                                          : "h-0"
                                      }`}
                                    >
                                      <div className='bg-gray-100 px-8 py-2'>
                                        <Link
                                          href={`/products?category=${childCategory.slug}`}
                                        >
                                          <a className='px-1'>
                                            {childCategory.name}
                                          </a>
                                        </Link>
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
    </div>
  );
}

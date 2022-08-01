import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { useSelector } from "react-redux";

import { Icons } from "components";

export default function Navbar() {
  //? Local State
  const [activeMinCat, setActiveMinCat] = useState("/electronic-devices");
  const [hover, setHover] = useState(false);

  //? Store
  const { categories } = useSelector((state) => state.categories);

  //? Handlers
  const handleActive = (cat) => {
    setActiveMinCat(cat.category);
  };
  const hanldeDeactive = () => {
    setActiveMinCat("/electronic-devices");
  };

  return (
    <div className='group'>
      <span
        className='flex px-2 cursor-default gap-x-1'
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Icons.Bars className='icon' />
        دسته‌بندی کالاها
      </span>
      <div
        className={`fixed left-0 z-10 w-full h-screen top-28 bg-gray-400/50 ${
          hover ? "block" : "hidden"
        }`}
      />

      <div
        className='absolute z-40 hidden w-full bg-white rounded-md shadow top-8 group-hover:block '
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => {
          hanldeDeactive();
          setHover(false);
        }}
      >
        <div className='flex'>
          <ul className='border-l-2 border-gray-100 w-72'>
            {categories.map((mainCategory) => {
              if (mainCategory.parent === "/") {
                return (
                  <li
                    key={mainCategory._id}
                    className='w-full px-2 py-0.5 text-sm hover:bg-gray-100 group'
                    onMouseOver={() => handleActive(mainCategory)}
                  >
                    <Link href={`/main/${mainCategory.slug}`}>
                      <a className='px-3 py-3 flex gap-x-1.5 items-center'>
                        <div className='relative h-7 w-7 grayscale '>
                          <Image src={mainCategory.image.url} layout='fill' />
                        </div>
                        <span>{mainCategory.name}</span>
                      </a>
                    </Link>
                  </li>
                );
              }
            })}
          </ul>
          <ul className='flex flex-wrap w-full gap-10 p-2'>
            {categories.map((parentCategory) => {
              if (parentCategory.parent === activeMinCat) {
                return (
                  <li key={parentCategory._id} className='h-fit'>
                    <Link href={`/products?category=${parentCategory.slug}`}>
                      <a className='flex items-center px-2 mb-1 text-sm font-semibold tracking-wider text-gray-700 border-r-2 border-red-500'>
                        {parentCategory.name}
                        <Icons.ArrowLeft className='icon' />
                      </a>
                    </Link>
                    <ul className='space-y-1'>
                      {categories.map((childCategory) => {
                        if (
                          childCategory.parent ===
                          "/" + parentCategory.slug
                        ) {
                          return (
                            <li key={childCategory._id} className=''>
                              <Link
                                href={`/products?category=${childCategory.slug}`}
                              >
                                <a className='px-1 text-xs font-medium text-gray-700'>
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
        </div>
      </div>
    </div>
  );
}

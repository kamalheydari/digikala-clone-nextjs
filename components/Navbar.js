import Link from "next/link";
import { useState } from "react";

import { useSelector } from "react-redux";

import { Icons } from "components";

export default function Navbar() {
  const [activeMinCat, setActiveMinCat] = useState("/electronic-devices");
  const { categories } = useSelector((state) => state.categories);

  const active = (cat) => {
    setActiveMinCat(cat.category);
  };
  const deactive = () => {
    setActiveMinCat("/electronic-devices");
  };

  return (
    <div className='group'>
      <Link href='/products?category=all'>
        <a className='flex px-2 gap-x-1 '>
          <Icons.Bars className='icon' />
          دسته‌بندی کالاها
        </a>
      </Link>
      <div
        className='absolute z-10 hidden w-full bg-white rounded-md shadow top-8 group-hover:block'
        onMouseLeave={deactive}
      >
        <div className='flex'>
          <ul className='border-l-2 border-gray-100 w-52'>
            {categories.map((mainCategory) => {
              if (mainCategory.parent === "/") {
                return (
                  <li
                    key={mainCategory._id}
                    className='w-full px-2 py-4 text-sm hover:bg-gray-100 group'
                    onMouseOver={() => active(mainCategory)}
                  >
                    <Link href={`/products?category=${mainCategory.slug}`}>
                      <a className='px-1'>{mainCategory.name}</a>
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
                      <a className='flex items-center px-2 mb-1 text-sm font-bold text-gray-700 border-r-2 border-red-500'>
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

{
  /* <div className="absolute top-0 space-y-3 text-right right-full b">
{categories.map((parentCategory) => {
  if (parentCategory.parent === mainCategory.category) {
    return (
      <li
        key={parentCategory._id}
        // hidden group-hover:flex
        className=' min-w-max'
      >
        <div className=''>{parentCategory.name}</div>

        {categories.map((childCategory) => {
          if (
            childCategory.parent ===
            "/" + parentCategory.slug
          ) {
            return (
              <li key={childCategory._id} className='hidden'>
                <div className=''>{childCategory.name}</div>
              </li>
            );
          }
        })}
      </li>
    );
  }
})}
</div> */
}

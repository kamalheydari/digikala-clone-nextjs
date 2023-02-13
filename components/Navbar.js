import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import { Icons, Skeleton } from "components";
import useCategory from "hooks/useCategory";

export default function Navbar() {
  const { categories, isLoading } = useCategory();

  //? State
  const [activeMinCat, setActiveMinCat] = useState("/electronic-devices");
  const [hover, setHover] = useState(false);

  //? Handlers
  const handleActive = (cat) => {
    setActiveMinCat(cat.category);
  };
  const hanldeDeactive = () => {
    setActiveMinCat("/electronic-devices");
  };

  //? Local Components
  const MainCategorySkeleton = () => (
    <Skeleton count={4}>
      <Skeleton.Items className='h-16 flex-center justify-between px-4'>
        <Skeleton.Item
          height='h-7'
          width='w-7'
          animated='background'
          className='rounded-full'
        />
        <Skeleton.Item height='h-5' width='w-32' animated='background' />
      </Skeleton.Items>
    </Skeleton>
  );

  //? Render
  return (
    <div className='navbar group'>
      <button
        className='navbar__button'
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Icons.Bars className='icon' />
        دسته‌بندی کالاها
      </button>
      <div className={`navbar__dropshadow ${hover ? "block" : "hidden"}`} />

      <div
        className='navbar__content '
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => {
          hanldeDeactive();
          setHover(false);
        }}
      >
        <div className='flex'>
          <ul className='navbar__content__main-categories'>
            {isLoading ? (
              <MainCategorySkeleton />
            ) : (
              categories.slice(0, 2).map((mainCategory) => {
                if (mainCategory.parent === "/") {
                  return (
                    <li
                      key={mainCategory._id}
                      className='main-category group'
                      onMouseOver={() => handleActive(mainCategory)}
                    >
                      <Link href={`/main/${mainCategory.slug}`}>
                        <a>
                          <div className='relative h-7 w-7 grayscale '>
                            <Image
                              src={mainCategory.image.url}
                              layout='fill'
                              alt={mainCategory.name}
                              placeholder='blur'
                              blurDataURL='/placeholder.png'
                            />
                          </div>
                          <span>{mainCategory.name}</span>
                        </a>
                      </Link>
                    </li>
                  );
                }
              })
            )}
          </ul>
          <ul className='navbar__content__sub-categories'>
            {isLoading
              ? null
              : categories.map((parentCategory) => {
                  if (parentCategory.parent === activeMinCat) {
                    return (
                      <li key={parentCategory._id} className='sub-category'>
                        <Link
                          href={`/products?category=${parentCategory.slug}`}
                        >
                          <a className='lvl-two_category'>
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
                                    <a className='lvl-three_category'>
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

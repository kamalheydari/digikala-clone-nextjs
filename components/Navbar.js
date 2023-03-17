import { useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'

import { Icons, NavbarSkeleton } from 'components'

import useCategory from 'hooks/useCategory'

export default function Navbar() {
  const { categories, isLoading } = useCategory()

  //? State
  const [activeMinCat, setActiveMinCat] = useState({})
  const [hover, setHover] = useState(false)

  //? Handlers
  const handleActive = (cat) => {
    setActiveMinCat(cat)
  }
  const hanldeDeactive = () => {
    setActiveMinCat(categories.filter((category) => category.level === 1)[0])
  }

  //? Re-Renders
  useEffect(() => {
    if (categories)
      setActiveMinCat(categories.filter((category) => category.level === 1)[0])
  }, [categories])

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
      <div className={`navbar__dropshadow ${hover ? 'block' : 'hidden'}`} />

      <div
        className='navbar__content '
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => {
          hanldeDeactive()
          setHover(false)
        }}
      >
        <div className='flex'>
          <ul className='navbar__content__main-categories'>
            {isLoading ? (
              <NavbarSkeleton />
            ) : categories ? (
              categories
                .filter((category) => category.level === 1)
                .map((levelOneCategory) => (
                  <li
                    key={levelOneCategory._id}
                    className='main-category group'
                    onMouseOver={() => handleActive(levelOneCategory)}
                  >
                    <Link href={`/main/${levelOneCategory.slug}`}>
                      <a>
                        <div className='relative h-7 w-7 grayscale '>
                          <Image
                            src={levelOneCategory.image}
                            layout='fill'
                            alt={levelOneCategory.name}
                            placeholder='blur'
                            blurDataURL='/placeholder.png'
                          />
                        </div>
                        <span>{levelOneCategory.name}</span>
                      </a>
                    </Link>
                  </li>
                ))
            ) : null}
          </ul>
          <ul className='navbar__content__sub-categories'>
            {isLoading
              ? null
              : activeMinCat
              ? categories.map((levelTwoCategory) => {
                  if (levelTwoCategory.parent === activeMinCat._id) {
                    return (
                      <li key={levelTwoCategory._id} className='sub-category'>
                        <Link
                          href={`/products?category=${levelTwoCategory.slug}`}
                        >
                          <a className='lvl-two_category'>
                            {levelTwoCategory.name}
                            <Icons.ArrowLeft className='icon' />
                          </a>
                        </Link>
                        <ul className='space-y-1'>
                          {categories
                            .filter(
                              (category) =>
                                category.parent === levelTwoCategory._id
                            )
                            .map((levelThreeCategory) => (
                              <li key={levelThreeCategory._id}>
                                <Link
                                  href={`/products?category=${levelThreeCategory.slug}`}
                                >
                                  <a className='lvl-three_category'>
                                    {levelThreeCategory.name}
                                  </a>
                                </Link>
                              </li>
                            ))}
                        </ul>
                      </li>
                    )
                  }
                })
              : null}
          </ul>
        </div>
      </div>
    </div>
  )
}

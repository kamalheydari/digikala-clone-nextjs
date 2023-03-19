import { useEffect, useState } from 'react'
import Link from 'next/link'

import { Icons, NavbarSkeleton, ResponsiveImage } from 'components'

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
                      <ResponsiveImage
                        dimensions='w-7 h-7'
                        className='grayscale'
                        src={levelOneCategory.image}
                        alt={levelOneCategory.name}
                      />

                      <span>{levelOneCategory.name}</span>
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
                          className='lvl-two_category'
                        >
                          {levelTwoCategory.name}
                          <Icons.ArrowLeft className='icon' />
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
                                  className='lvl-three_category'
                                >
                                  {levelThreeCategory.name}
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

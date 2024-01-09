import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useGetCategoriesQuery } from 'services'

import { ArrowLeft, Bars } from 'icons'
import { NavbarSkeleton } from 'components/skeleton'
import { ResponsiveImage } from 'components/ui'

import type { ICategory } from 'types'

export default function Navbar() {
  // ? Get Categories Query
  const { categories, isLoading } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data, isLoading }) => ({
      categories: data?.categories,
      isLoading,
    }),
  })

  // ? State
  const [activeMinCat, setActiveMinCat] = useState<ICategory>({} as ICategory)
  const [hover, setHover] = useState(false)

  // ? Handlers
  const handleActive = (cat: ICategory) => {
    setActiveMinCat(cat)
  }
  const hanldeDeactive = () => {
    if (categories) setActiveMinCat(categories.filter((category) => category.level === 1)[0])
  }

  // ? Re-Renders
  useEffect(() => {
    if (categories) setActiveMinCat(categories?.filter((category) => category.level === 1)[0])
  }, [categories])

  // ? Render
  return (
    <div className="group hidden lg:block">
      <button
        className="flex-center gap-x-1 px-2 text-sm"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => setHover(false)}
      >
        <Bars className="icon" />
        دسته‌بندی کالاها
      </button>
      <div className={`fixed left-0 top-28 z-20 h-screen w-full bg-gray-400/50 ${hover ? 'block' : 'hidden'}`} />

      <div
        className="absolute top-8 z-40 hidden w-full rounded-md border border-gray-100 bg-white shadow-lg group-hover:block"
        onMouseOver={() => setHover(true)}
        onMouseLeave={() => {
          hanldeDeactive()
          setHover(false)
        }}
      >
        <div className="flex">
          <ul className="w-72 border-l-2 border-gray-100">
            {isLoading ? (
              <NavbarSkeleton />
            ) : categories ? (
              categories
                .filter((category) => category.level === 1)
                .map((levelOneCategory) => (
                  <li
                    key={levelOneCategory._id}
                    className="group w-full px-2 py-0.5 text-sm hover:bg-gray-100"
                    onMouseOver={() => handleActive(levelOneCategory)}
                  >
                    <Link href={`/main/${levelOneCategory.slug}`} className="flex items-center gap-x-1.5 p-3">
                      <ResponsiveImage
                        dimensions="w-7 h-7"
                        className="grayscale"
                        src={levelOneCategory.image.url}
                        blurDataURL={levelOneCategory.image.placeholder}
                        alt={levelOneCategory.name}
                      />

                      <span className="text-base font-normal">{levelOneCategory.name}</span>
                    </Link>
                  </li>
                ))
            ) : null}
          </ul>
          <ul className="flex w-full flex-wrap gap-10 px-2 py-4">
            {isLoading
              ? null
              : activeMinCat
                ? categories?.map((levelTwoCategory) => {
                    if (levelTwoCategory.parent === activeMinCat._id) {
                      return (
                        <li key={levelTwoCategory._id} className="h-fit">
                          <Link
                            href={`/products?category=${levelTwoCategory.slug}`}
                            className="flex-center mb-1 border-r-2 border-red-500 px-2 text-sm font-semibold tracking-wider text-gray-700"
                          >
                            {levelTwoCategory.name}
                            <ArrowLeft className="icon" />
                          </Link>
                          <ul className="space-y-1">
                            {categories
                              .filter((category) => category.parent === levelTwoCategory._id)
                              .map((levelThreeCategory) => (
                                <li key={levelThreeCategory._id}>
                                  <Link
                                    href={`/products?category=${levelThreeCategory.slug}`}
                                    className="px-3 text-xs font-medium text-gray-700"
                                  >
                                    {levelThreeCategory.name}
                                  </Link>
                                </li>
                              ))}
                          </ul>
                        </li>
                      )
                    } else return null
                  })
                : null}
          </ul>
        </div>
      </div>
    </div>
  )
}

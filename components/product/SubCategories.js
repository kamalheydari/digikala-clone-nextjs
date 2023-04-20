import { useEffect, useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { ResponsiveImage } from 'components'

export default function SubCategories(props) {
  //? Props
  const { childCategories } = props

  //? States
  const [queris, setQueris] = useState('')

  const router = useRouter()

  //? Re-Renders
  useEffect(() => {
    if (router.asPath.indexOf('&') !== -1) {
      setQueris(router.asPath.substring(router.asPath.indexOf('&')))
    }
  }, [router.query])

  //? Render(s)
  if (childCategories.length > 0)
    return (
      <section className='px-4 my-7'>
        <h4 className='mb-4 text-base text-black lg:pt-4'>دسته‌بندی‌ها</h4>
        <div className='flex gap-3 pb-3 overflow-x-auto'>
          {childCategories.map((item) => (
            <Link
              key={item._id}
              href={`/products?category=${item.slug}${queris}`}
              className='px-3 pt-4 pb-2 text-center border-4 border-gray-100 rounded-md'
            >
              <ResponsiveImage
                dimensions='w-24 h-24 md:h-32 md:w-32 xl:w-40 xl:h-40'
                src={item.image}
                alt={item.name}
              />

              <span className='inline-block mt-2'>{item.name}</span>
            </Link>
          ))}
        </div>
      </section>
    )
  else return null
}

// import { useEffect, useState } from 'react'
// import Link from 'next/link'
// import { useRouter } from 'next/router'

// import { ResponsiveImage } from 'components'

// export default function SubCategories(props) {
//   //? Props
//   const { childCategories, handleGetProducts } = props

//   //? States
//   const [queris, setQueris] = useState('')

//   const router = useRouter()

//   //? Re-Renders
//   useEffect(() => {
//     if (router.asPath.indexOf('&') !== -1) {
//       setQueris(router.asPath.substring(router.asPath.indexOf('&')))
//     }
//   }, [router.query])

//   //? Render(s)
//   if (childCategories.length > 0)
//     return (
//       <section className='px-4 my-7'>
//         <h4 className='mb-4 text-base text-black lg:pt-4'>دسته‌بندی‌ها</h4>
//         <div className='flex gap-3 pb-3 overflow-x-auto'>
//           {childCategories.map((item) => (
//             <Link
//               key={item._id}
//               href={`/products?category=${item.slug}${queris}`}
//               className='px-3 pt-4 pb-2 text-center border-4 border-gray-100 rounded-md'
//               onClick={(e) => {
//                 e.preventDefault()
//                 handleGetProducts({
//                   category_slug: item.slug,
//                   category_id: item._id,
//                 })
//               }}
//             >
//               <ResponsiveImage
//                 dimensions='w-24 h-24 md:h-32 md:w-32 xl:w-40 xl:h-40'
//                 src={item.image}
//                 alt={item.name}
//               />

//               <span className='inline-block mt-2'>{item.name}</span>
//             </Link>
//           ))}
//         </div>
//       </section>
//     )
//   else return null
// }

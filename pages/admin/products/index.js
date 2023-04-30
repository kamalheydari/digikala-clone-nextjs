import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useRef, useState } from 'react'

import {
  useDeleteProductMutation,
  useGetCategoriesQuery,
  useGetProductsQuery,
} from 'services'

import {
  BigLoading,
  ConfirmDeleteModal,
  DashboardLayout,
  DeleteIconBtn,
  EditIconBtn,
  HandleResponse,
  Icons,
  PageContainer,
  Pagination,
  SelectCategories,
} from 'components'

import { useDisclosure, useChangeRoute } from 'hooks'

function Products() {
  //? Assets
  const router = useRouter()
  const changeRoute = useChangeRoute({
    shallow: true,
  })

  //? Get Categories Query
  const { categories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      categories: data?.categories,
    }),
  })

  //? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  //? Refs
  const inputSearchRef = useRef()

  //?  State
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
  })
  const [search, setSearch] = useState(router.query?.search || '')
  const [selectedCategories, setSelectedCategories] = useState({
    level_one: {},
    level_two: {},
    level_three: {},
  })

  //? Querirs
  //*    Get Products Data
  const { data, isFetching, error, isError, refetch } = useGetProductsQuery({
    page: router.query?.page || 1,
    category: router.query?.category || '',
    search: router.query?.search || search,
  })

  //*    Delete Product
  const [
    deleteProduct,
    {
      isSuccess: isSuccess_delete,
      isError: isError_delete,
      error: error_delete,
      data: data_delete,
      isLoading: isLoading_delete,
    },
  ] = useDeleteProductMutation()

  //? Handlers
  const handleDelete = (id) => {
    setDeleteInfo({ id })
    confirmDeleteModalHandlers.open()
  }

  const handleEdit = (id) => {
    router.push(`/admin/products/edit?id=${id}`)
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    let queris = {
      page: 1,
    }

    if (selectedCategories?.level_three?._id) {
      queris.category = selectedCategories?.level_three.slug
      queris.level_one = selectedCategories?.level_one._id
      queris.level_two = selectedCategories?.level_two._id
      queris.level_three = selectedCategories?.level_three._id
    } else if (selectedCategories?.level_two?._id) {
      queris.category = selectedCategories?.level_two?.slug
      queris.level_one = selectedCategories?.level_one._id
      queris.level_two = selectedCategories?.level_two._id
    } else if (selectedCategories?.level_one?._id) {
      queris.category = selectedCategories?.level_one.slug
      queris.level_one = selectedCategories?.level_one._id
    }

    if (inputSearchRef.current.value.trim()) {
      setSearch(inputSearchRef.current.value)
      queris.search = inputSearchRef.current.value
    }

    changeRoute(queris)
  }

  const handleRemoveSearch = () => {
    inputSearchRef.current.value = ''
    setSearch('')
    setSelectedCategories({
      level_one: {},
      level_two: {},
      level_three: {},
    })
    refetch()
    router.push('/admin/products', undefined, { shallow: true })
  }

  const findCategory = (id) => categories?.find((cat) => cat._id === id)

  //? Re-Render
  useEffect(() => {
    if (categories) {
      if (router.query?.level_three)
        setSelectedCategories({
          level_one: findCategory(router.query.level_one),
          level_three: findCategory(router.query.level_three),
          level_two: findCategory(router.query.level_two),
        })
      else if (router.query?.level_two)
        setSelectedCategories({
          ...selectedCategories,
          level_one: findCategory(router.query.level_one),
          level_two: findCategory(router.query.level_two),
        })
      else if (router.query?.level_one)
        setSelectedCategories({
          ...selectedCategories,
          level_one: findCategory(router.query.level_one),
        })
    }
  }, [categories])

  //? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title='محصول'
        deleteFunc={deleteProduct}
        isLoading={isLoading_delete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        deleteInfo={deleteInfo}
        setDeleteInfo={setDeleteInfo}
      />

      {/* Handle Delete Response */}
      {(isSuccess_delete || isError_delete) && (
        <HandleResponse
          isError={isError_delete}
          isSuccess={isSuccess_delete}
          error={error_delete?.data?.err}
          message={data_delete?.msg}
          onSuccess={() => {
            confirmDeleteModalHandlers.close()
            setDeleteInfo({ id: '' })
          }}
          onError={() => {
            confirmDeleteModalHandlers.close()
            setDeleteInfo({ id: '' })
          }}
        />
      )}

      <main>
        <Head>
          <title>مدیریت | محصولات</title>
        </Head>
        <DashboardLayout>
          <PageContainer title='محصولات'>
            {isError ? (
              <div className='py-20 mx-auto space-y-3 text-center w-fit'>
                <h5 className='text-xl'>خطایی رخ داده</h5>
                <p className='text-lg text-red-500'>{error.data.err}</p>
                <button className='mx-auto btn' onClick={refetch}>
                  تلاش مجدد
                </button>
              </div>
            ) : isFetching ? (
              <section className='px-3 py-20'>
                <BigLoading />
              </section>
            ) : (
              <section className='p-3 space-y-7' id='_adminProducts'>
                <form
                  className='max-w-4xl mx-auto space-y-5'
                  onSubmit={handleSubmit}
                >
                  <SelectCategories
                    setSelectedCategories={setSelectedCategories}
                    selectedCategories={selectedCategories}
                  />

                  <div className='flex flex-row-reverse rounded-md gap-x-2 '>
                    <button
                      type='button'
                      className='p-2 text-white border flex-center gap-x-2 min-w-max'
                      onClick={handleRemoveSearch}
                    >
                      <span>حذف فیلترها</span>
                      <Icons.Close className='icon' />
                    </button>
                    <input
                      type='text'
                      placeholder='نام محصول ...'
                      className='flex-grow p-1 text-right input'
                      ref={inputSearchRef}
                      defaultValue={search}
                    />
                    <button
                      type='submit'
                      className='p-2 border flex-center gap-x-2 min-w-max'
                    >
                      <span>اعمال فیلتر</span>
                      <Icons.Search className='icon' />
                    </button>
                  </div>
                </form>

                {data?.productsLength > 0 ? (
                  <>
                    <section className='overflow-x mt-7'>
                      <table className='w-full overflow-scroll table-auto'>
                        <thead className='bg-zinc-50 h-9'>
                          <tr className='text-zinc-500'>
                            <th className='w-28'></th>
                            <th className='border-r-2 border-zinc-200'>
                              نام محصول (تعداد: {data.productsLength})
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {data.products.map((item) => (
                            <tr
                              key={item._id}
                              className='border-b-2 border-gray-100'
                            >
                              <td className='flex items-center justify-center p-2 gap-x-4'>
                                <DeleteIconBtn
                                  onClick={() => handleDelete(item._id)}
                                />
                                <EditIconBtn
                                  onClick={() => handleEdit(item._id)}
                                />
                              </td>
                              <td className='p-2'>{item.title}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </section>
                    {data?.productsLength > 10 && (
                      <Pagination
                        pagination={data.pagination}
                        changeRoute={changeRoute}
                        section='_adminProducts'
                      />
                    )}
                  </>
                ) : (
                  <div className='text-center text-red-500 lg:border lg:border-gray-200 lg:rounded-md lg:py-4'>
                    کالایی یافت نشد
                  </div>
                )}
              </section>
            )}
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Products), { ssr: false })

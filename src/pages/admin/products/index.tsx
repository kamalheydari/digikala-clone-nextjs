import Link from 'next/link'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

import { useDeleteProductMutation, useGetCategoriesQuery, useGetProductsQuery } from '@/services'

import { useDisclosure, useChangeRoute } from '@/hooks'

import { Close, Search } from '@/icons'

import { DashboardLayout } from '@/components/Layouts'
import { ConfirmDeleteModal } from '@/components/modals'
import { CategorySelector } from '@/components/categories'
import { HandleResponse, DataStateDisplay } from '@/components/shared'
import { TableSkeleton } from '@/components/skeleton'
import { Pagination } from '@/components/navigation'
import { PageContainer, DeleteIconButton, EditIconButton } from '@/components/ui'

import type { NextPage } from 'next'
import type { ICategory } from '@/types'

export interface SelectedCategories {
  levelOne?: ICategory
  levelTwo?: ICategory
  levelThree?: ICategory
}

const Products: NextPage = () => {
  // ? Assets
  const { query, push } = useRouter()
  const page = query.page ? +query.page : 1
  const category = (query.category as string) ?? ''

  const changeRoute = useChangeRoute({
    shallow: true,
  })

  const initialSelectedCategories = {
    levelOne: {} as ICategory,
    levelTwo: {} as ICategory,
    levelThree: {} as ICategory,
  }

  // ? Get Categories Query
  const { categories } = useGetCategoriesQuery(undefined, {
    selectFromResult: ({ data }) => ({
      categories: data?.categories,
    }),
  })

  // ? Modals
  const [isShowConfirmDeleteModal, confirmDeleteModalHandlers] = useDisclosure()

  // ?  State
  const [deleteInfo, setDeleteInfo] = useState({
    id: '',
  })
  const [search, setSearch] = useState('')
  const [selectedCategories, setSelectedCategories] = useState<SelectedCategories>(initialSelectedCategories)

  // ? Querirs
  //*    Get Products Data
  const { data, ...productsQueryProps } = useGetProductsQuery({
    page,
    category,
    search: query?.search as string,
  })

  //*    Delete Product
  const [
    deleteProduct,
    {
      isSuccess: isSuccessDelete,
      isError: isErrorDelete,
      error: errorDelete,
      data: dataDelete,
      isLoading: isLoadingDelete,
    },
  ] = useDeleteProductMutation()

  // ? Handlers
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const queryParams: {
      page: number
      category?: string
      levelOne?: string
      levelTwo?: string
      levelThree?: string
      search?: string
    } = {
      page: 1,
    }

    if (selectedCategories?.levelThree?._id) {
      queryParams.category = selectedCategories.levelThree.slug
      queryParams.levelOne = selectedCategories?.levelOne?._id
      queryParams.levelTwo = selectedCategories?.levelTwo?._id
      queryParams.levelThree = selectedCategories.levelThree._id
    } else if (selectedCategories?.levelTwo?._id) {
      queryParams.category = selectedCategories?.levelTwo.slug
      queryParams.levelOne = selectedCategories?.levelOne?._id
      queryParams.levelTwo = selectedCategories?.levelTwo._id
    } else if (selectedCategories?.levelOne?._id) {
      queryParams.category = selectedCategories?.levelOne.slug
      queryParams.levelOne = selectedCategories?.levelOne._id
    }

    if (search.trim()) {
      queryParams.search = search
    }

    changeRoute(queryParams)
  }

  const handleRemoveSearch = () => {
    setSearch('')
    setSelectedCategories(initialSelectedCategories)
    productsQueryProps.refetch()
    push('/admin/products', undefined, { shallow: true })
  }

  const findCategory = (id: string) => categories?.find((cat) => cat._id === id)

  //*   Delete Handlers
  const handleDelete = (id: string) => {
    setDeleteInfo({ id })
    confirmDeleteModalHandlers.open()
  }

  const onCancel = () => {
    setDeleteInfo({ id: '' })
    confirmDeleteModalHandlers.close()
  }

  const onConfirm = () => {
    deleteProduct({ id: deleteInfo.id })
  }

  const onSuccess = () => {
    confirmDeleteModalHandlers.close()
    setDeleteInfo({ id: '' })
  }
  const onError = () => {
    confirmDeleteModalHandlers.close()
    setDeleteInfo({ id: '' })
  }

  // ? Re-Render
  useEffect(() => {
    if (categories) {
      if (query?.levelThree)
        setSelectedCategories({
          levelOne: findCategory(query.levelOne as string),
          levelThree: findCategory(query.levelThree as string),
          levelTwo: findCategory(query.levelTwo as string),
        })
      else if (query?.levelTwo)
        setSelectedCategories({
          ...selectedCategories,
          levelOne: findCategory(query.levelOne as string),
          levelTwo: findCategory(query.levelTwo as string),
        })
      else if (query?.levelOne)
        setSelectedCategories({
          ...selectedCategories,
          levelOne: findCategory(query.levelOne as string),
        })
    }
  }, [categories])

  useEffect(() => {
    if (query?.search) setSearch(query.search as string)
  }, [query?.search])

  // ? Render(s)
  return (
    <>
      <ConfirmDeleteModal
        title="محصول"
        isLoading={isLoadingDelete}
        isShow={isShowConfirmDeleteModal}
        onClose={confirmDeleteModalHandlers.close}
        onCancel={onCancel}
        onConfirm={onConfirm}
      />

      {/* Handle Delete Response */}
      {(isSuccessDelete || isErrorDelete) && (
        <HandleResponse
          isError={isErrorDelete}
          isSuccess={isSuccessDelete}
          error={errorDelete}
          message={dataDelete?.msg}
          onSuccess={onSuccess}
          onError={onError}
        />
      )}

      <main>
        <Head>
          <title>مدیریت | محصولات</title>
        </Head>
        <DashboardLayout>
          <PageContainer title="محصولات">
            <section className="space-y-7 p-3" id="_adminProducts">
              <form className="mx-auto max-w-4xl space-y-5" onSubmit={handleSubmit}>
                <CategorySelector
                  setSelectedCategories={setSelectedCategories}
                  selectedCategories={selectedCategories}
                />

                <div className="flex flex-row-reverse gap-x-2 rounded-md ">
                  <button
                    type="button"
                    className="flex-center min-w-max gap-x-2 border p-2 text-white"
                    onClick={handleRemoveSearch}
                  >
                    <span>حذف فیلترها</span>
                    <Close className="icon" />
                  </button>
                  <input
                    type="text"
                    placeholder="نام محصول ..."
                    className="input grow p-1 text-right"
                    value={search}
                    onChange={handleSearchChange}
                  />
                  <button type="submit" className="flex-center min-w-max gap-x-2 border p-2">
                    <span>اعمال فیلتر</span>
                    <Search className="icon" />
                  </button>
                </div>
              </form>

              <DataStateDisplay
                {...productsQueryProps}
                dataLength={data ? data.productsLength : 0}
                loadingComponent={<TableSkeleton count={10} />}
              >
                <section className="mt-7 overflow-x-scroll">
                  <table className="w-full table-auto overflow-scroll">
                    <thead className="h-9 bg-zinc-50">
                      <tr className="text-zinc-500">
                        <th className="w-28"></th>
                        <th className="border-r-2 border-zinc-200">نام محصول (تعداد: {data?.productsLength})</th>
                      </tr>
                    </thead>
                    <tbody>
                      {data?.products.map((item) => (
                        <tr key={item._id} className="border-b-2 border-gray-100">
                          <td className="flex items-center justify-center gap-x-4 p-2">
                            <DeleteIconButton onClick={() => handleDelete(item._id)} />
                            <Link href={`/admin/products/edit/${item._id}`}>
                              <EditIconButton />
                            </Link>
                          </td>
                          <td className="p-2">{item.title}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </section>
              </DataStateDisplay>

              {data && data?.productsLength > 10 && (
                <Pagination pagination={data.pagination} section="_adminProducts" />
              )}
            </section>
          </PageContainer>
        </DashboardLayout>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(Products), { ssr: false })

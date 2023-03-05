import Head from 'next/head'
import { useEffect, useState, useRef } from 'react'
import { useRouter } from 'next/router'

import {
  useCreateProductMutation,
  useGetSingleProductQuery,
  useUpdateProductMutation,
} from 'app/api/productApi'

import { useGetDetailsQuery } from 'app/api/detailsApi'

import {
  AddColors,
  SelectCategories,
  AddSizes,
  UploadImages,
  ConfirmUpdateModal,
  PageContainer,
  Button,
  HandleResponse,
  TextField,
  BigLoading,
} from 'components'

import useDisclosure from 'hooks/useDisclosure'
import { useForm } from 'react-hook-form'

export default function Product() {
  //? Assets
  const router = useRouter()
  const { id } = router.query

  //? Modals
  const [isShowConfirmUpdateModal, confirmUpdateModalHandlers] = useDisclosure()

  //? State
  const [isEdit, setIsEdit] = useState(false)
  const [images, setImages] = useState([])
  const [selectedCategories, setSelectedCategories] = useState({})
  const [updateInfo, setUpdateInfo] = useState({
    id: '',
    editedData: {},
  })
  const [isDetailsSkip, setIsDetailsSkip] = useState(true)

  //? Form Hook
  const { handleSubmit, register, reset, control, getValues, watch, setValue } =
    useForm({
      defaultValues: {
        title: '',
        price: 0,
        discount: 0,
        description: '',
        images: [],
        sizes: [],
        colors: [],
        category: '',
        inStock: 0,
        info: [],
        specification: [],
      },
    })

  //? Queries
  //*   Get Details
  const { data: details, isFetching: isFetching_get } = useGetDetailsQuery(
    {
      id: selectedCategories?.lvlTwoCategory?._id,
    },
    { skip: isDetailsSkip }
  )

  //*   Create Product
  const [createProduct, { data, isSuccess, isLoading, isError, error }] =
    useCreateProductMutation()

  //*   Update Product
  const [
    updateProduct,
    {
      data: data_update,
      isSuccess: isSuccess_update,
      isError: isError_update,
      error: error_update,
      isLoading: isLoading_update,
    },
  ] = useUpdateProductMutation()

  //*    Edit Product
  const { data: data_product_get } = useGetSingleProductQuery(
    { id },
    { skip: !isEdit }
  )

  //? Re-Renders
  //*   Select Category To Fetch Details
  useEffect(() => {
    if (selectedCategories?.lvlTwoCategory?._id) {
      setIsDetailsSkip(false)
    }
  }, [selectedCategories?.lvlTwoCategory?._id])

  //*   Set Details
  useEffect(() => {
    if (details) {
      setValue('info', details.info)
      setValue('specification', details.specification)
      setValue('optionsType', details.optionsType)
    }
  }, [details])

  //*   Execute Get Product Query
  useEffect(() => {
    if (id) {
      setIsEdit(true)
    }
  }, [])

  //*   Set Product Details On Edit Mode
  useEffect(() => {
    if (data_product_get) {
      const {
        title,
        price,
        discount,
        description,
        images,
        sizes,
        colors,
        category,
        inStock,
        info,
        specification,
      } = data_product_get.product
      reset({
        title,
        price,
        discount,
        description,
        sizes,
        colors,
        category,
        inStock,
        info,
        specification,
      })
      setImages(images)
    }
  }, [data_product_get])

  //? Hanlders
  const submitHandler = (data) => {
    createProduct({
      body: {
        ...data,
        category: selectedCategories.lvlThreeCategory.category,
      },
    })
  }

  const updateHandler = async () => {
    setUpdateInfo({
      ...updateInfo,
      id,
      editedData: {
        ...data_product_get.product,
        ...watch(),
      },
    })
    confirmUpdateModalHandlers.open()
  }

  const deleteImageHandler = (selected) => {
    setImages(images.filter((item) => item.url !== selected.url))
  }

  const addImageHandler = (newImages) => {
    setImages([...newImages])
  }

  const getUploadedImagesHandler = (media, imgOldURL) => {
    setImages([...media, ...imgOldURL])
  }

  //? Render(s)

  return (
    <>
      <ConfirmUpdateModal
        title='مشخصات و ویژگی های'
        updateFunc={updateProduct}
        isLoading={isLoading_update}
        isShow={isShowConfirmUpdateModal}
        onClose={confirmUpdateModalHandlers.close}
        updateInfo={updateInfo}
        setUpdateInfo={setUpdateInfo}
      />

      {/* Handle Update Response */}
      {(isSuccess_update || isError_update) && (
        <HandleResponse
          isError={isError_update}
          isSuccess={isSuccess_update}
          error={error_update?.data?.err}
          message={data_update?.msg}
          onSuccess={() => {
            setUpdateInfo({ id: '', editedData: {} })
            confirmUpdateModalHandlers.close()
          }}
          onError={() => {
            setUpdateInfo({ id: '', editedData: {} })
            confirmUpdateModalHandlers.close()
          }}
        />
      )}

      {/* Handle Create Product Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.err}
          message={data?.msg}
          onSuccess={() => {
            router.push('/admin/products')
          }}
        />
      )}

      <main>
        <Head>
          <title>مدیریت | {id ? 'بروزرسانی محصول' : 'محصول جدید'}</title>
        </Head>

        <PageContainer title={id ? 'بروزرسانی محصول' : 'محصول جدید'}>
          <section className='p-3 md:px-3 xl:px-8 2xl:px-10'>
            <form onSubmit={handleSubmit(submitHandler)} className='space-y-10'>
              <TextField label='عنوان' name='title' control={control} />
              <div className='space-y-1.5'>
                <label htmlFor='description'>معرفی</label>
                <textarea
                  cols='30'
                  rows='4'
                  type='text'
                  className='text-right input'
                  name='description'
                  id='description'
                  {...register('description')}
                />
              </div>
              <UploadImages
                multiple
                deleteImageHandler={deleteImageHandler}
                images={images}
                addImage={addImageHandler}
                getUploadedImages={getUploadedImagesHandler}
              />

              <div className='space-y-4 md:flex md:gap-x-2 md:items-baseline md:justify-evenly'>
                <TextField
                  label='قیمت'
                  name='price'
                  control={control}
                  type='number'
                  direction='ltr'
                />
                <TextField
                  label='موجودی'
                  name='inStock'
                  control={control}
                  type='number'
                  direction='ltr'
                />

                <TextField
                  label='تخفیف برحسب درصد'
                  name='discount'
                  control={control}
                  type='number'
                  direction='ltr'
                />
              </div>
              {!id && (
                <SelectCategories
                  setSelectedCategories={setSelectedCategories}
                  show={['lvlOne', 'lvlTwo', 'lvlThree']}
                />
              )}
              {getValues('optionsType') === 'colors' ||
              getValues('colors').length > 0 ? (
                <AddColors
                  name='colors'
                  control={control}
                  register={register}
                />
              ) : getValues('optionsType') === 'sizes' ||
                getValues('sizes').length > 0 ? (
                <AddSizes name='sizes' control={control} register={register} />
              ) : (
                ''
              )}
              <div className='text-sm space-y-1.5'>
                <span>ویژگی‌ها</span>
                <table className='w-full max-w-2xl mx-auto'>
                  <thead className='bg-emerald-50 text-emerald-500'>
                    <tr className=''>
                      <th className='w-2/5  p-2.5'>نام</th>
                      <th>مقدار</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getValues('info').map((item, index) => (
                      <tr key={index} className='border-b-2 border-gray-100'>
                        <td className='my-0.5 text-right'>
                          <input
                            type='text'
                            className='text-field__input'
                            {...register(`info.${index}.title`)}
                          />
                        </td>
                        <td className='p-2'>
                          <textarea
                            type='text'
                            className='text-field__input'
                            {...register(`info.${index}.value`)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className='text-sm space-y-1.5'>
                <span>مشخصات</span>
                <table className='w-full max-w-2xl mx-auto'>
                  <thead className='bg-fuchsia-50 text-fuchsia-500 '>
                    <tr>
                      <th className='w-2/5 p-2.5'>نام</th>
                      <th>مقدار</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getValues('specification').map((item, index) => (
                      <tr key={index} className='border-b-2 border-gray-100'>
                        <td className='my-0.5 text-right'>
                          <input
                            type='text'
                            className='text-field__input'
                            {...register(`specification.${index}.title`)}
                          />
                        </td>
                        <td className='p-2'>
                          <textarea
                            type='text'
                            className='text-field__input'
                            {...register(`specification.${index}.value`)}
                          />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              {id ? (
                <Button
                  className='bg-amber-500 mx-auto'
                  rounded
                  onClick={updateHandler}
                  isLoading={isLoading_update}
                >
                  بروزرسانی اطلاعات
                </Button>
              ) : (
                <Button
                  className='bg-green-500 mx-auto'
                  rounded
                  type='submit'
                  isLoading={isLoading}
                >
                  ثبت اطلاعات
                </Button>
              )}
            </form>
          </section>
        </PageContainer>
      </main>
    </>
  )
}

Product.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>
}

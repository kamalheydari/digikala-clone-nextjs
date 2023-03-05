import Head from 'next/head'
import { useState } from 'react'

import { useCreateCategoryMutation } from 'app/api/categoryApi'

import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { categorySchema } from 'utils/validation'

import {
  SelectCategories,
  UploadImages,
  TextField,
  PageContainer,
  Button,
  HandleResponse,
} from 'components'

export default function CreateCategory() {
  //?  States
  const [images, setImages] = useState([])
  const [selectedCategories, setSelectedCategories] = useState({})

  //? Create Category
  const [createCtegory, { data, isSuccess, isLoading, error, isError }] =
    useCreateCategoryMutation()

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(categorySchema),
  })

  //? Handlers
  const submitHander = ({ name, slug }) => {
    let parent, category

    name = name.trim()
    slug = slug.trim().split(' ').join('-')

    if (
      selectedCategories?.lvlOneCategory?._id &&
      !selectedCategories?.lvlTwoCategory?._id
    ) {
      //* Set LvlTwo category

      parent = selectedCategories?.lvlOneCategory.category
      category = parent + '/' + slug
    } else if (
      selectedCategories?.lvlOneCategory?._id &&
      selectedCategories?.lvlTwoCategory?._id
    ) {
      //* Set lvlThree category

      parent = '/' + selectedCategories?.lvlTwoCategory.slug
      category =
        '/' +
        selectedCategories?.lvlOneCategory.slug +
        '/' +
        selectedCategories?.lvlTwoCategory.slug +
        '/' +
        slug
    } else {
      //* Set LvlOne category

      parent = '/'
      category = parent + slug
    }

    createCtegory({
      body: { name, parent, category, slug, image: images[0] },
    })
  }

  const deleteImageHandler = () => {
    setImages([])
  }

  const addImageHandler = (newImages) => {
    setImages([...newImages])
  }

  const getUploadedImagesHandler = (media, imgOldURL) => {
    setImages([...media, ...imgOldURL])
  }

  //? Render
  return (
    <>
      {/* Handle Create Category Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.err}
          message={data?.msg}
          onSuccess={() => {
            setImages([])
            reset()
          }}
        />
      )}

      <main>
        <Head>
          <title>مدیریت | دسته بندی جدید</title>
        </Head>

        <PageContainer title='دسته بندی جدید'>
          <section className='p-3 md:px-3 xl:px-8 2xl:px-10'>
            <form
              className='flex flex-col justify-between flex-1 gap-y-5 overflow-y-auto pl-4'
              onSubmit={handleSubmit(submitHander)}
            >
              <TextField
                label='نام دسته‌بندی'
                control={control}
                errors={formErrors.name}
                name='name'
              />

              <TextField
                label='مسیر (با حروف انگلیسی)'
                control={control}
                errors={formErrors.slug}
                name='slug'
                direction='ltr'
              />

              <UploadImages
                deleteImageHandler={deleteImageHandler}
                images={images}
                addImage={addImageHandler}
                getUploadedImages={getUploadedImagesHandler}
              />

              <SelectCategories
                setSelectedCategories={setSelectedCategories}
                show={['lvlOne', 'lvlTwo']}
              />

              <div className='py-3 lg:pb-0 '>
                <Button
                  type='submit'
                  className='mx-auto !bg-green-500 '
                  isLoading={isLoading}
                  rounded
                >
                  ثبت اطلاعات
                </Button>
              </div>
            </form>
          </section>
        </PageContainer>
      </main>
    </>
  )
}

CreateCategory.getDashboardLayout = function pageLayout(page) {
  return <>{page}</>
}

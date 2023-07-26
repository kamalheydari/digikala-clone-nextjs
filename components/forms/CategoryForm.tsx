import { yupResolver } from '@hookform/resolvers/yup'
import { TextField, Button, UploadImage } from 'components'
import Image from 'next/image'
import { useEffect } from 'react'

import { useForm } from 'react-hook-form'
import type { DataModels, ICategoryForm } from 'types'
import { categorySchema } from 'utils'

interface CreateCategoryFormProps {
  mode: 'create'
  createHandler: (data: ICategoryForm) => void
  selectedCategory?: never
  updateHandler?: never
  isLoading: boolean
  parentLvl: number
}

interface EditCategoryFormProps {
  mode: 'edit'
  updateHandler: (data: ICategoryForm) => void
  selectedCategory: DataModels.ICategory
  createHandler?: never
  isLoading: boolean
  parentLvl?: never
}

type Props = CreateCategoryFormProps | EditCategoryFormProps
const CategoryForm: React.FC<Props> = (props) => {
  //? Props
  const {
    mode,
    selectedCategory,
    createHandler,
    updateHandler,
    isLoading,
    parentLvl,
  } = props

  //? Assets
  const defaultValues = {
    name: '',
    slug: '',
    image: '',
    colors: { start: '#000000', end: '#000000' },
  }

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    register,
    watch,
    getValues,
    setValue,
  } = useForm<ICategoryForm>({
    resolver: yupResolver(categorySchema),
    defaultValues,
  })

  //? Re-Renders
  //*   Set Category Details on Edit Mode
  useEffect(() => {
    if (selectedCategory && mode === 'edit') {
      const { image, name, slug, colors } = selectedCategory
      reset({ image, name, slug, colors })
    }
  }, [selectedCategory])

  //? Handlers
  const handleAddUploadedImageUrl = (url: string) => setValue('image', url)

  return (
    <section className='p-3 md:px-3 xl:px-8 2xl:px-10'>
      <form
        className='flex flex-col justify-between flex-1 overflow-y-auto gap-y-5'
        onSubmit={
          mode === 'create'
            ? handleSubmit(createHandler)
            : handleSubmit(updateHandler)
        }
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

        <TextField
          label='آدرس تصویر'
          control={control}
          errors={formErrors.image}
          name='image'
          direction='ltr'
        />

        <UploadImage
          folder='/icons'
          handleAddUploadedImageUrl={handleAddUploadedImageUrl}
        />

        {categorySchema.isValidSync(watch()) && (
          <div className='mx-auto max-w-max'>
            {getValues('image') && (
              <Image
                src={getValues('image')}
                width={200}
                height={200}
                className='mx-auto'
                alt='category image'
              />
            )}
          </div>
        )}

        {((selectedCategory && selectedCategory.level <= 1) ||
          parentLvl === 0) && (
          <div className='flex justify-evenly'>
            <div className='flex flex-col space-y-3'>
              <label className='text-field__label' htmlFor='colors.start'>
                رنگ اول
              </label>
              <input
                className='w-40 h-10'
                id='colors.start'
                type='color'
                {...register('colors.start')}
              />
            </div>

            <div className='flex flex-col space-y-3'>
              <label className='text-field__label' htmlFor='colors.end'>
                رنگ دوم
              </label>
              <input
                className='w-40 h-10'
                id='colors.end'
                type='color'
                {...register('colors.end')}
              />
            </div>
          </div>
        )}

        <div className='py-3 lg:pb-0 '>
          {mode === 'edit' ? (
            <Button
              className='mx-auto bg-amber-500'
              isRounded={true}
              type='submit'
              isLoading={isLoading}
            >
              بروزرسانی اطلاعات
            </Button>
          ) : (
            <Button
              type='submit'
              className='mx-auto !bg-green-500 '
              isLoading={isLoading}
              isRounded={true}
            >
              ثبت اطلاعات
            </Button>
          )}
        </div>
      </form>
    </section>
  )
}

export default CategoryForm

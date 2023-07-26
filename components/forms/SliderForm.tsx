import { useEffect } from 'react'
import Image from 'next/image'

import { Button, ControlledCheckbox, TextField, UploadImage } from 'components'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { sliderSchema } from 'utils'

import type { DataModels, ISliderForm } from 'types'

interface CreateBannerFormProps {
  mode: 'create'
  createHandler: (data: ISliderForm) => void
  updateHandler?: never
  deleteHandler?: never
  isLoadingCreate: boolean
  selectedSlider?: never
  isLoadingDelete?: never
  isLoadingUpdate?: never
}

interface EditBannerFormProps {
  mode: 'edit'
  createHandler?: never
  updateHandler: (data: ISliderForm) => void
  selectedSlider: DataModels.ISlider
  isLoadingCreate?: never
  isLoadingDelete: boolean
  isLoadingUpdate: boolean
  deleteHandler: () => void
}

type Props = CreateBannerFormProps | EditBannerFormProps

const SliderForm: React.FC<Props> = (props) => {
  //? Props
  const {
    mode,
    createHandler,
    updateHandler,
    deleteHandler,
    isLoadingCreate,
    isLoadingDelete,
    isLoadingUpdate,
    selectedSlider,
  } = props

  //? Assets
  const defaultValues = {
    image: { url: '' },
    title: '',
    uri: '',
    isPublic: true,
  }

  //? Hook Form
  const {
    control,
    getValues,
    reset,
    setValue,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<ISliderForm>({
    defaultValues,
    resolver: yupResolver(sliderSchema),
  })

  //? Handlers
  const handleAddUploadedImageUrl = (url: string) => setValue('image.url', url)

  //? Re-Renders
  useEffect(() => {
    if (selectedSlider && mode === 'edit') {
      const { image, title, uri, isPublic } = selectedSlider
      reset({ image, title, uri, isPublic })
    }
  }, [selectedSlider])

  return (
    <section className='p-3 mx-auto mb-10 space-y-8'>
      <div className='mx-3 overflow-x-auto mt-7 lg:mx-5 xl:mx-10'>
        <form
          onSubmit={
            mode === 'create'
              ? handleSubmit(createHandler)
              : handleSubmit(updateHandler)
          }
        >
          <TextField
            label='عنوان اسلایدر'
            control={control}
            name='title'
            errors={formErrors?.title}
          />

          <TextField
            label='آدرس لینک'
            direction='ltr'
            control={control}
            name='uri'
            errors={formErrors?.uri}
          />

          <TextField
            label='آدرس تصویر'
            direction='ltr'
            control={control}
            name='image.url'
            errors={formErrors?.image?.url}
          />

          <UploadImage
            folder='/sliders'
            handleAddUploadedImageUrl={handleAddUploadedImageUrl}
          />

          <div className='w-44 my-3'>
            <ControlledCheckbox
              name='isPublic'
              control={control}
              label='وضعیت انتشار'
            />
          </div>

          {sliderSchema.isValidSync(watch()) && (
            <div className='mx-auto max-w-max'>
              {getValues('image.url') && (
                <Image
                  src={getValues('image.url')}
                  width={1000}
                  height={300}
                  alt='banner image'
                />
              )}
            </div>
          )}

          <div className='flex justify-evenly gap-x-4 pt-10'>
            {mode === 'edit' ? (
              <>
                <Button
                  className='bg-amber-500 '
                  isRounded={true}
                  type='submit'
                  isLoading={isLoadingUpdate}
                >
                  بروزرسانی اسلایدر
                </Button>

                <Button
                  className='rounded-3xl'
                  isLoading={isLoadingDelete}
                  onClick={deleteHandler}
                >
                  حذف اسلایدر
                </Button>
              </>
            ) : (
              <Button
                className='bg-green-500 '
                isRounded={true}
                type='submit'
                isLoading={isLoadingCreate}
              >
                ثبت اسلایدر
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default SliderForm

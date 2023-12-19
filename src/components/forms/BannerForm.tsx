import { useEffect } from 'react'
import Image from 'next/image'

import { Button, ControlledCheckbox, TextField, UploadImage } from 'components'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { bannerSchema } from 'utils'

import type { IBanner, IBannerForm } from 'types'

interface CreateBannerFormProps {
  mode: 'create'
  createHandler: (data: IBannerForm) => void
  updateHandler?: never
  deleteHandler?: never
  isLoadingCreate: boolean
  selectedBanner?: never
  isLoadingDelete?: never
  isLoadingUpdate?: never
}

interface EditBannerFormProps {
  mode: 'edit'
  createHandler?: never
  updateHandler: (data: IBannerForm) => void
  selectedBanner: IBanner
  isLoadingCreate?: never
  isLoadingDelete: boolean
  isLoadingUpdate: boolean
  deleteHandler: () => void
}

type Props = CreateBannerFormProps | EditBannerFormProps

const BannerForm: React.FC<Props> = (props) => {
  // ? Props
  const {
    mode,
    createHandler,
    updateHandler,
    deleteHandler,
    isLoadingCreate,
    isLoadingDelete,
    isLoadingUpdate,
    selectedBanner,
  } = props

  // ? Assets
  const defaultValues: Partial<IBannerForm> = {
    image: { url: '', placeholder: '' },
    title: '',
    uri: '',
    isPublic: true,
    type: 'one',
  }

  // ? Hook Form
  const {
    control,
    getValues,
    reset,
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors: formErrors },
  } = useForm<IBannerForm>({
    defaultValues,
    resolver: yupResolver(bannerSchema),
  })

  // ? Handlers
  const handleAddUploadedImage = ({ url, placeholder }: { url: string; placeholder: string; id: string }) => {
    setValue('image.url', url)
    setValue('image.placeholder', placeholder)
  }

  // ? Re-Renders
  useEffect(() => {
    if (selectedBanner && mode === 'edit') {
      const { image, title, uri, isPublic, type } = selectedBanner

      reset({ image, title, uri, isPublic, type })
    }
  }, [selectedBanner])

  return (
    <section className="mx-auto mb-10 space-y-8 p-3">
      <div className="mx-3 mt-7 overflow-x-auto lg:mx-5 xl:mx-10">
        <form
          onSubmit={mode === 'create' ? handleSubmit(createHandler) : handleSubmit(updateHandler)}
          className="space-y-3"
        >
          <TextField label="عنوان بنر" control={control} name="title" errors={formErrors?.title} />

          <TextField label="آدرس لینک" control={control} name="uri" errors={formErrors?.uri} />

          <div className="my-3 w-44">
            <ControlledCheckbox name="isPublic" control={control} label="وضعیت انتشار" />
          </div>

          <div className="mb-5 flex items-center gap-8">
            <label className="inline-flex items-center gap-x-2">
              <input className="h-5 w-5 text-red-700" type="radio" value="one" {...register('type')} />
              <span className="ml-2 text-gray-800">نوع اول</span>
            </label>

            <label className="inline-flex items-center gap-x-2">
              <input className="h-5 w-5 text-red-700" type="radio" value="two" {...register('type')} />
              <span className="ml-2 text-gray-800">نوع دوم</span>
            </label>
          </div>

          <TextField label="آدرس تصویر" control={control} name="image.url" errors={formErrors?.image?.url} />

          <UploadImage folder="/banners" handleAddUploadedImage={handleAddUploadedImage} />

          {bannerSchema.isValidSync(watch()) && (
            <div className="mx-auto max-w-max">
              {getValues('image.url') && (
                <Image
                  src={getValues('image.url')}
                  width={getValues('type') === 'one' ? 400 : 300}
                  height={200}
                  alt="banner image"
                />
              )}
            </div>
          )}

          <div className="flex justify-evenly gap-x-4 pt-10">
            {mode === 'edit' ? (
              <>
                <Button className="bg-amber-600 " isRounded={true} type="submit" isLoading={isLoadingUpdate}>
                  بروزرسانی بنر
                </Button>

                <Button isRounded={true} isLoading={isLoadingDelete} onClick={deleteHandler}>
                  حذف بنر
                </Button>
              </>
            ) : (
              <Button className="bg-green-600 " isRounded={true} type="submit" isLoading={isLoadingCreate}>
                ثبت بنر
              </Button>
            )}
          </div>
        </form>
      </div>
    </section>
  )
}

export default BannerForm

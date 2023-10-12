import Image from 'next/image'

import { Control, FieldError, useFieldArray } from 'react-hook-form'

import { DisplayError, UploadImage } from 'components'
import { Delete } from 'icons'

import type { IProductForm } from 'types'

interface Props {
  control: Control<IProductForm>
  errors?: { url?: FieldError | undefined }[] | undefined
}

const ImageList: React.FC<Props> = (props) => {
  //? Props
  const { control, errors } = props

  //? Form Hook
  const { fields, append, remove } = useFieldArray({
    name: 'images',
    control,
  })

  //? Handlers
  const handleAddUploadedImageUrl = (url: string) => append({ url })

  //? Render(s)
  return (
    <div className='space-y-3'>
      <UploadImage
        folder='/products'
        handleAddUploadedImageUrl={handleAddUploadedImageUrl}
      />

      <div className='flex flex-wrap mx-3 gap-x-2 gap-y-3'>
        {/*  @ts-ignore  */}
        <DisplayError errors={errors} />
        {fields.map((image, idx) => (
          <div
            className='relative overflow-hidden transition-colors border border-gray-200 rounded-md max-w-max hover:border-gray-300'
            key={idx}
          >
            <Image
              src={image.url}
              width={150}
              height={150}
              alt='product image'
            />
            <button
              type='button'
              className='absolute z-10 -top-1 -right-1'
              onClick={() => remove(idx)}
              title='حذف'
            >
              <Delete className='p-1 text-red-500 bg-red-100 icon w-7 h-7 rounded-2xl' />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageList

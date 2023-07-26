import Image from 'next/image'
import { useRef } from 'react'

import { Control, FieldError, useFieldArray } from 'react-hook-form'

import { UploadImage, Icons, AddIconButton, DisplayError } from 'components'

import type { IProductForm } from 'types'

interface Props {
  control: Control<IProductForm>
  errors?: { url?: FieldError | undefined }[] | undefined
}

const ImageList: React.FC<Props> = (props) => {
  //? Props
  const { control, errors } = props

  //? Refs
  // const inputRef = useRef<HTMLInputElement | null>(null)

  //? Form Hook
  const { fields, append, remove } = useFieldArray({
    name: 'images',
    control,
  })

  //? Handlers
  // const handleAddImageUrl = () => {
  //   if (inputRef.current) {
  //     const imageUrl = inputRef.current.value.trim()
  //     if (!imageUrl) return

  //     append({ url: imageUrl })
  //     inputRef.current.value = ''
  //   }
  // }

  const handleAddUploadedImageUrl = (url: string) => append({ url })

  //? Render(s)
  return (
    <div className='space-y-3'>
      {/* <div className='space-y-3'>
        <label className='text-field__label' htmlFor='images'>
          آدرس تصویر
        </label>
        <div className='flex items-center gap-x-2'>
          <input
            style={{ direction: 'ltr' }}
            type='text'
            className='text-field__input'
            placeholder='...'
            ref={inputRef}
          />
          <AddIconButton onClick={handleAddImageUrl} />
        </div>
        <DisplayError errors={errors} />
      </div> */}

      <UploadImage
        folder='/products'
        handleAddUploadedImageUrl={handleAddUploadedImageUrl}
      />

      <div className='flex flex-wrap mx-3 gap-x-2 gap-y-3'>
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
              <Icons.Delete className='p-1 text-red-500 bg-red-100 icon w-7 h-7 rounded-2xl' />
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ImageList

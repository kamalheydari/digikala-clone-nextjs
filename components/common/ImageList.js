import Image from 'next/image'
import { useRef } from 'react'
import { useFieldArray } from 'react-hook-form'
import { AddIconBtn } from './IconBtns'
import Icons from './Icons'

export default function ImageList(props) {
  //? Props
  const { name, control } = props

  //? Refs
  const inputRef = useRef()

  //? Form Hook
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })

  //? Handlers
  const handleAddImage = () => {
    if (inputRef.current.value.trim() === '') return
    append({ url: inputRef.current.value })
    inputRef.current.value = ''
  }

  //? Render(s)
  return (
    <div className='space-y-3'>
      <div className='space-y-3'>
        <label className='text-field__label' htmlFor={name}>
          آدرس تصویر
        </label>
        <div className='flex items-center gap-x-2'>
          <AddIconBtn onClick={handleAddImage} />
          <input
            style={{ direction: 'ltr' }}
            type='text'
            className='text-field__input'
            placeholder='...'
            ref={inputRef}
          />
        </div>
      </div>
      <div className='flex flex-wrap mx-3 gap-x-2 gap-y-3'>
        {fields.map((image, idx) => (
          <div
            className='relative overflow-hidden transition-colors border border-gray-200 rounded-md max-w-max hover:border-gray-300'
            key={idx}
          >
            <Image src={image.url} width={150} height={150} alt={name} />
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

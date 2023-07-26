import { useRef } from 'react'

import { AddIconButton, DeleteIconButton } from 'components'

import { Control, UseFormRegister, useFieldArray } from 'react-hook-form'

import { nanoid } from '@reduxjs/toolkit'

import type { IProductForm } from 'types'

interface Props {
  control: Control<IProductForm>
  register: UseFormRegister<IProductForm>
}

const AddColors: React.FC<Props> = (props) => {
  //? Props
  const { control, register } = props

  //? Refs
  const inputTextRef = useRef<HTMLInputElement>(null)
  const inputColorRef = useRef<HTMLInputElement>(null)

  //? Form Hook
  const { fields, append, remove } = useFieldArray({
    name: 'colors',
    control,
  })

  //? Handlers
  const handleAddToColor = () => {
    if (inputTextRef.current && inputColorRef.current) {
      const newColorName = inputTextRef.current.value.trim()

      if (!newColorName) return

      append({
        id: nanoid(),
        name: inputTextRef.current.value,
        hashCode: inputColorRef.current.value,
      })

      inputTextRef.current.value = ''
      inputColorRef.current.value = '#bc203f'
    }
  }

  //? Render(s)
  return (
    <div className='text-sm space-y-1.5'>
      <span>اندازه ها</span>
      <div className='w-full max-w-2xl mx-auto space-y-3'>
        <div className='flex items-center gap-x-2'>
          <AddIconButton onClick={handleAddToColor} />
          <input
            type='text'
            className='inline-block outline-none input w-44'
            name='name'
            placeholder='نام رنگ'
            ref={inputTextRef}
          />
          <input
            type='color'
            name='hashCode'
            className='w-24 h-9'
            ref={inputColorRef}
            defaultValue='#bc203f'
          />
        </div>
        <div className='flex flex-wrap justify-center gap-x-5 gap-y-3'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='shadow rounded flex gap-x-2 items-center px-1.5 py-2 bg-gray-50'
            >
              <DeleteIconButton onClick={() => remove(index)} />
              <input
                className='text-field__input w-28'
                {...register(`colors.${index}.name`)}
              />
              <input
                type='color'
                className='w-8 h-8 mr-3 shadow-lg '
                {...register(`colors.${index}.hashCode`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddColors

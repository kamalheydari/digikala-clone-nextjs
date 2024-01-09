import { useRef } from 'react'

import { Control, UseFormRegister, useFieldArray } from 'react-hook-form'

import { nanoid } from '@reduxjs/toolkit'

import { AddIconButton, DeleteIconButton } from 'components/ui'

import type { IProductForm } from 'types'

interface Props {
  control: Control<IProductForm>
  register: UseFormRegister<IProductForm>
}

const ProductColorForm: React.FC<Props> = (props) => {
  // ? Props
  const { control, register } = props

  // ? Refs
  const inputTextRef = useRef<HTMLInputElement>(null)
  const inputColorRef = useRef<HTMLInputElement>(null)

  // ? Form Hook
  const { fields, append, remove } = useFieldArray({
    name: 'colors',
    control,
  })

  // ? Handlers
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

  // ? Render(s)
  return (
    <div className="space-y-1.5 text-sm">
      <span>رنگ ها</span>
      <div className="mx-auto w-full max-w-2xl space-y-3">
        <div className="flex items-center gap-x-2">
          <AddIconButton onClick={handleAddToColor} />
          <input
            type="text"
            className="input inline-block w-44 outline-none"
            name="name"
            placeholder="نام رنگ"
            ref={inputTextRef}
          />
          <input type="color" name="hashCode" className="h-9 w-24" ref={inputColorRef} defaultValue="#bc203f" />
        </div>
        <div className="flex flex-wrap justify-center gap-x-5 gap-y-3">
          {fields.map((field, index) => (
            <div key={field.id} className="flex items-center gap-x-2 rounded bg-gray-50 px-1.5 py-2 shadow">
              <DeleteIconButton onClick={() => remove(index)} />
              <input className="text-field__input w-28" {...register(`colors.${index}.name`)} />
              <input type="color" className="mr-3 h-8 w-8 shadow-lg " {...register(`colors.${index}.hashCode`)} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductColorForm

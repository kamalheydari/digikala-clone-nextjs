import { useRef } from 'react'

import { Control, UseFormRegister, useFieldArray } from 'react-hook-form'

import { AddIconButton, DeleteIconButton } from 'components'

import type { IProductForm } from 'types'
import { nanoid } from '@reduxjs/toolkit'

interface Props {
  control: Control<IProductForm>
  register: UseFormRegister<IProductForm>
}

const AddSizes: React.FC<Props> = (props) => {
  // ? Props
  const { control, register } = props

  // ? Refs
  const inputRef = useRef<HTMLInputElement>(null)

  // ? Form Hook
  const { fields, append, remove } = useFieldArray({
    name: 'sizes',
    control,
  })

  // ? Handlers
  const handleAddSize = () => {
    if (inputRef.current) {
      const newSize = inputRef.current.value.trim()

      if (!newSize) return

      append({ id: nanoid(), size: newSize })
      inputRef.current.value = ''
    }
  }

  // ? Render(s)
  return (
    <div className="space-y-1.5 text-sm">
      <span>اندازه ها</span>
      <div className="mx-auto w-full max-w-2xl space-y-3">
        <div className="flex items-center gap-x-2">
          <AddIconButton onClick={handleAddSize} />
          <input
            style={{ direction: 'ltr' }}
            type="number"
            className="input inline-block w-44 outline-none"
            placeholder="..."
            ref={inputRef}
          />
        </div>
        <div className="flex flex-wrap items-baseline justify-evenly space-x-3 space-y-4">
          {fields.map((field, index) => (
            <div key={field.id} className="flex w-1/4 items-center gap-x-3 rounded px-1.5 py-2 shadow">
              <DeleteIconButton onClick={() => remove(index)} />
              <input
                style={{ direction: 'ltr' }}
                className="text-field__input "
                {...register(`sizes.${index}.size`, {
                  valueAsNumber: true,
                })}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default AddSizes

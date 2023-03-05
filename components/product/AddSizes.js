import { useRef } from 'react'

import { useFieldArray } from 'react-hook-form'

import { AddIconBtn, DeleteIconBtn } from 'components'

export default function AddSizes({ name, control, register }) {
  //? Refs
  const inputRef = useRef()

  //? Form Hook
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })

  //? Handlers
  const handleAddSize = () => {
    if (inputRef.current.value.trim() === '') return
    append({ size: +inputRef.current.value })
    inputRef.current.value = ''
  }

  //? Render
  return (
    <div className='text-sm space-y-1.5'>
      <span>اندازه ها</span>
      <div className='w-full max-w-2xl mx-auto space-y-3'>
        <div className='flex items-center gap-x-2'>
          <AddIconBtn onClick={handleAddSize} />
          <input
            style={{ direction: 'ltr' }}
            type='number'
            className='inline-block outline-none input w-44'
            placeholder='...'
            ref={inputRef}
          />
        </div>
        <div className='space-y-4 space-x-3 flex flex-wrap items-baseline justify-evenly'>
          {fields.map((field, index) => (
            <div
              key={field.id}
              className='shadow rounded flex items-center gap-x-3 w-1/4 px-1.5 py-2'
            >
              <DeleteIconBtn onClick={() => remove(index)} />
              <input
                style={{ direction: 'ltr' }}
                className='text-field__input '
                {...register(`${name}.${index}.size`, {
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

import { useRef } from 'react'

import { AddIconBtn, DeleteIconBtn } from 'components'

import { useFieldArray } from 'react-hook-form'

export default function AddColors(props) {
  //? Props
  const { control, register, name } = props

  //? Refs
  const inputTextRef = useRef()
  const inputColorRef = useRef()

  //? Form Hook
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })

  //? Handlers
  const handleAddToColor = () => {
    if (inputTextRef.current.value.trim() === '') return
    append({
      name: inputTextRef.current.value,
      hashCode: inputColorRef.current.value,
    })
    inputTextRef.current.value = ''
    inputColorRef.current.value = '#bc203f'
  }

  //? Render(s)
  return (
    <div className='text-sm space-y-1.5'>
      <span>اندازه ها</span>
      <div className='w-full max-w-2xl mx-auto space-y-3'>
        <div className='flex items-center gap-x-2'>
          <AddIconBtn onClick={handleAddToColor} />
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
              <DeleteIconBtn onClick={() => remove(index)} />
              <input
                className='text-field__input w-28'
                {...register(`${name}.${index}.name`)}
              />
              <input
                type='color'
                name='hashCode'
                className='w-8 h-8 mr-3 shadow-lg '
                {...register(`${name}.${index}.hashCode`)}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

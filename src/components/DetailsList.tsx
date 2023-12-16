import { useRef } from 'react'

import { type FieldError, Control, UseFormRegister, useFieldArray } from 'react-hook-form'

import { AddIconButton, DeleteIconButton, DisplayError } from 'components'
import type { IDetailsForm } from 'types'

interface Props {
  name: 'specification' | 'info'
  control: Control<IDetailsForm>
  categoryName: string
  register: UseFormRegister<IDetailsForm>
  errors?:
    | {
        title?: FieldError | undefined
      }[]
    | undefined
}

const DetailsList: React.FC<Props> = (props) => {
  // ? Props
  const { categoryName, name, control, register, errors } = props

  // ? Refs
  const newDetailRef = useRef<HTMLInputElement | null>(null)

  // ? Form
  const { fields, append, remove } = useFieldArray({
    name,
    control,
  })

  // ? Handlers
  const handleAddNewDetail = () => {
    if (newDetailRef.current) {
      append({ title: newDetailRef.current.value })
      newDetailRef.current.value = ''
    }
  }

  // ? Render
  return (
    <section>
      <div className="mb-2 text-sm lg:text-base">
        {name === 'info' ? <span>ویژگی‌ها</span> : <span> مشخصات</span>}{' '}
        <span className={name === 'info' ? ' text-emerald-700' : ' text-fuchsia-700'}>{categoryName}</span>
      </div>
      <table className="w-full">
        <thead
          className={name === 'info' ? 'bg-emerald-200/80 text-emerald-600' : 'bg-fuchsia-300/80 text-fuchsia-600'}
        >
          <tr className="">
            <th>نام</th>
            <th className="w-1/4 p-2.5">مقدار</th>
          </tr>
        </thead>
        <tbody>
          {fields.map((field, index) => (
            <tr key={field.id} className="border-b-2 border-gray-300">
              <td className="flex items-center gap-x-2 p-2">
                <DeleteIconButton onClick={() => remove(index)} />
                <input className="text-field__input" {...register(`${name}.${index}.title`)} />
              </td>
              <td
                className={`${
                  name === 'info' ? 'bg-emerald-200/80 text-emerald-600' : 'bg-fuchsia-300/80 text-fuchsia-600'
                } px-2 `}
              >
                <DisplayError errors={errors?.[index]?.title} />
              </td>
            </tr>
          ))}
          <tr className="border-b-2 border-green-200">
            <td className="flex p-2">
              <AddIconButton onClick={handleAddNewDetail} />
              <input type="text" className="text-field__input " ref={newDetailRef} placeholder="..." />
            </td>
            <td
              className={name === 'info' ? 'bg-emerald-200 text-emerald-600' : 'bg-fuchsia-300 text-fuchsia-600'}
            ></td>
          </tr>
        </tbody>
      </table>
    </section>
  )
}

export default DetailsList

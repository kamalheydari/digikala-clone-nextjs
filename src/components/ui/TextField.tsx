import { DisplayError } from '@/components/ui'

import { Control, FieldError, useController } from 'react-hook-form'

interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string
  errors?: FieldError | undefined
  name: string
  control: Control<any>
}

const TextField: React.FC<Props> = (props) => {
  // ? Props
  const { label, errors, name, type = 'text', control, ...restProps } = props

  // ? Form Hook
  const { field } = useController({ name, control, rules: { required: true } })

  const direction = /^[a-zA-Z0-9]+$/.test(field.value?.[0]) ? 'ltr' : 'rtl'

  // ? Handlers
  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value

    if (type === 'number' && inputValue.length !== 0) {
      field.onChange(parseInt(inputValue))
    } else {
      field.onChange(inputValue)
    }
  }

  // ? Render(s)
  return (
    <div>
      {label && (
        <label className="mb-3 block text-xs text-gray-700 md:min-w-max lg:text-sm" htmlFor={name}>
          {label}
        </label>
      )}
      <input
        className="block w-full rounded-md border border-gray-200 bg-zinc-50/30 px-3 py-1.5 text-base outline-none transition-colors placeholder:text-center focus:border-blue-600 lg:text-lg"
        style={{ direction }}
        id={name}
        type={type}
        value={field?.value}
        name={field.name}
        onBlur={field.onBlur}
        onChange={onChangeHandler}
        ref={field.ref}
        {...restProps}
      />

      <DisplayError errors={errors} />
    </div>
  )
}

export default TextField

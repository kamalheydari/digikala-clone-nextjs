import { Control, FieldError, useController } from 'react-hook-form'

import { DisplayError } from '@/components/ui'

interface Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  name: string
  control: Control<any>
  label?: string
  errors?: FieldError | undefined
}

const TextArea: React.FC<Props> = (props) => {
  // ? Props
  const { name, control, label, errors, ...restProps } = props

  // ? Form Hook
  const { field } = useController({ name, control })

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="mb-3 block text-xs text-gray-700 md:min-w-max lg:text-sm" htmlFor={field.name}>
          {label}
        </label>
      )}
      <textarea
        cols={30}
        rows={4}
        className="input text-right"
        value={field?.value}
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        id={name}
        {...restProps}
      />
      <DisplayError errors={errors} />
    </div>
  )
}

export default TextArea

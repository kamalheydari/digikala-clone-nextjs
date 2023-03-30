import { DisplayError } from 'components'
import { useController } from 'react-hook-form'

export default function TextField(props) {
  //? Props
  const { label, errors, name, type, control, direction, ...inputProps } = props

  //? Form Hook
  const { field } = useController({ name, control, rules: { required: true } })

  //? Handlers
  const onChangeHandler = (e) => {
    if (type === 'number' && e.target.value.length !== 0) {
      field.onChange(parseInt(e.target.value))
    } else {
      field.onChange(e.target.value)
    }
  }

  //? Render(s)
  return (
    <div className={`${label ? 'space-y-3' : ''}`}>
      {label && (
        <label
          className='text-xs text-gray-700 lg:text-sm md:min-w-max'
          htmlFor={name}
        >
          {label}
        </label>
      )}
      <input
        style={{ direction: `${direction === 'ltr' ? 'ltr' : ''}` }}
        className='block w-full px-3 py-1.5 text-base transition-colors border border-gray-200 rounded-md outline-none bg-zinc-50/30 lg:text-lg focus:border-blue-600'
        id={name}
        type={type === 'password' ? 'password' : 'text'}
        value={field?.value}
        name={field.name}
        onBlur={field.onBlur}
        onChange={onChangeHandler}
        ref={field.ref}
        {...inputProps}
      />

      <DisplayError errors={errors} />
    </div>
  )
}

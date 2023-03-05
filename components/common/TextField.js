import { DisplayError } from 'components'
import { useController } from 'react-hook-form'

export default function TextField({
  label,
  errors,
  name,
  type,
  control,
  direction,
  ...inputProps
}) {
  const { field } = useController({ name, control, rules: { required: true } })

  const onChangeHandler = (e) => {
    if (type === 'number') {
      field.onChange(parseInt(e.target.value))
    } else {
      field.onChange(e.target.value)
    }
  }

  return (
    <div className={`${label ? 'space-y-3' : ''}`}>
      {label && (
        <label className='text-field__label' htmlFor={name}>
          {label}
        </label>
      )}
      <input
        style={{ direction: `${direction === 'ltr' ? 'ltr' : ''}` }}
        className='text-field__input'
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

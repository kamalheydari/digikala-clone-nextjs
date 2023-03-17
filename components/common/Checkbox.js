import { useController } from 'react-hook-form'

export default function Checkbox({ name, control, label, ...restProps }) {
  const { field } = useController({ name, control })

  return (
    <label className='flex items-center mb-3 gap-x-2'>
      <input
        type='checkbox'
        className='w-6 h-6 bg-white border border-gray-300 rounded-md appearance-none form-tick bg-check checked:bg-green-500 checked:border-transparent focus:outline-none'
        checked={field.value}
        name={field.name}
        onBlur={field.onBlur}
        onChange={field.onChange}
        ref={field.ref}
        {...restProps}
      />
      <span className='font-normal text-gray-700'>{label}</span>
    </label>
  )
}

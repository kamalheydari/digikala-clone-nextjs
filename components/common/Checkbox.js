import { forwardRef } from 'react'
import { useController } from 'react-hook-form'

export const CustomCheckbox = forwardRef((props, ref) => {
  const { label, name, checked, onChange, ...restProps } = props

  return (
    <div className='flex justify-between py-2.5'>
      <span className='font-medium text-gray-700 w-3/4'>{label}</span>
      <div className='relative inline-block w-12 mr-2 align-middle select-none'>
        <input
          type='checkbox'
          name={name}
          id={name}
          checked={checked}
          onChange={onChange}
          ref={ref ? ref : null}
          {...restProps}
          className='absolute block w-4 h-4 duration-200 ease-in bg-gray-400 rounded-full appearance-none cursor-pointer checked:bg-white right-7 top-1 lg:right-6 checked:right-1'
        />
        <label
          htmlFor={name}
          className={`block h-6 overflow-hidden border-2 border-gray-400  rounded-full cursor-pointer ${
            checked ? 'bg-blue-500 border-blue-500' : 'bg-white'
          }`}
        ></label>
      </div>
    </div>
  )
})

export const ControlledCheckbox = (props) => {
  const { name, control, ...restProps } = props

  const { field } = useController({ name, control })

  return (
    <CustomCheckbox
      checked={field?.value}
      name={field?.name}
      onBlur={field.onBlur}
      onChange={field.onChange}
      ref={field.ref}
      {...restProps}
    />
  )
}

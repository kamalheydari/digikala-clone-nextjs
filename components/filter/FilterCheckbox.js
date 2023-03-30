export default function FilterCheckbox(props) {
  //? Porps
  const { children, name, onChange, value } = props

  //? Render(s)
  return (
    <div className='flex justify-between py-4'>
      <span className='font-medium text-gray-700'>{children}</span>
      <div className='relative inline-block w-12 mr-2 align-middle select-none'>
        <input
          type='checkbox'
          name={name}
          id={name}
          checked={value}
          onChange={onChange}
          className='absolute block w-4 h-4 duration-200 ease-in bg-gray-400 rounded-full appearance-none cursor-pointer checked:bg-white right-7 top-1 checked:right-1'
        />
        <label
          htmlFor={name}
          className={`block h-6 overflow-hidden border-2 border-gray-400  rounded-full cursor-pointer ${
            value ? 'bg-blue-500 border-blue-500' : 'bg-white'
          }`}
        ></label>
      </div>
    </div>
  )
}

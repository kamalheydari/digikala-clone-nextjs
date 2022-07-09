export default function Checkbox({ children, name, onChange, value }) {
  return (
    <div className='flex justify-between py-4'>
      <span className='font-medium text-gray-700'>{children}</span>
      <div className='relative inline-block w-10 mr-2 align-middle select-none'>
        <input
          type='checkbox'
          name={name}
          checked={value}
          onChange={onChange}
          className='absolute block w-6 h-6 duration-200 ease-in bg-white border-4 rounded-full appearance-none cursor-pointer checked:bg-blue-500 right-4 checked:right-0'
        />
        <label className='block h-6 overflow-hidden bg-gray-300 rounded-full cursor-pointer'></label>
      </div>
    </div>
  );
}

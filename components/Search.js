import { Icons } from "components";
export default function Search() {
  return (
    <form className='flex flex-row-reverse flex-grow max-w-3xl rounded-md bg-zinc-200/80 '>
      <input
        type='text'
        placeholder='جستجو'
        className='flex-grow p-1 text-right bg-transparent outline-none input'
      />
      <button className='p-2'>
        <Icons.Search className='icon' />
      </button>
    </form>
  );
}

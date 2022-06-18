import { useRouter } from "next/router";

import { Icons } from "components";

export default function BackButton({ children, backRoute }) {
  const router = useRouter();
  return (
    <div className='flex items-center px-5 pb-4 gap-x-1'>
      <button
        className='lg:hidden'
        type='button'
        onClick={() => router.push(backRoute)}
      >
        <Icons.ArrowRight className='icon' />
      </button>
      <span className='text-sm md:text-base'>{children}</span>
    </div>
  );
}

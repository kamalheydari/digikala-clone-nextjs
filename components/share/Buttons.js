import { Icons } from "components";

import { useRouter } from "next/router";

const Back = ({ children, backRoute }) => {
  const router = useRouter();
  return (
    <div className='flex items-center px-3 pb-3 gap-x-1'>
      <button
        className='lg:hidden'
        type='button'
        onClick={() => router.push(backRoute)}
      >
        <Icons.ArrowRight className=' text-gray-500  w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 rounded-2xl bg-gray-50' />
      </button>
      <span className='pb-1 text-sm lg:border-red-500 lg:border-b-2 md:text-base'>
        {children}
      </span>
    </div>
  );
};

const Delete = (props) => {
  return (
    <button type='button' {...props} title='Delete'>
      <Icons.Delete className=' text-red-500  w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 rounded-2xl bg-red-100' />
    </button>
  );
};

const Edit = (props) => {
  return (
    <button type='button' {...props} title='Edit'>
      <Icons.Edit className=' text-amber-500  w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5 rounded-2xl bg-amber-100' />
    </button>
  );
};

const Add = (props) => {
  return (
    <button type='button' {...props} title='Add'>
      <Icons.Plus className=' text-green-500 bg-green-100 rounded-2xl w-8 h-8 p-1 lg:w-9 lg:h-9 lg:p-1.5' />
    </button>
  );
};

const Buttons = { Delete, Edit, Add, Back };
export default Buttons;

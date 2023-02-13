import { Icons } from "components";

import { useRouter } from "next/router";

const IconButton = ({ title, iconColor, icon: Icon, bg, ...restPorps }) => {
  return (
    <button type='button' title={title} className='mx-3 my-2' {...restPorps}>
      <Icon className={`icon-button ${bg} ${iconColor}`} />
    </button>
  );
};

export const BackIconBtn = (props) => {
  const { back } = useRouter();
  return (
    <IconButton
      title='برگشت'
      icon={Icons.ArrowRight}
      iconColor='text-gray-500'
      bg='bg-gray-50'
      onClick={() => back()}
      {...props}
    />
  );
};

export const EditIconBtn = (props) => (
  <IconButton
    title='تغییر'
    icon={Icons.Edit}
    iconColor='text-amber-500'
    bg='bg-amber-100'
    {...props}
  />
);

export const DeleteIconBtn = (props) => (
  <IconButton
    title='حذف'
    icon={Icons.Delete}
    iconColor='text-red-500'
    bg='bg-red-100'
    {...props}
  />
);

export const AddIconBtn = (props) => (
  <IconButton
    title='اضافه'
    icon={Icons.Plus}
    iconColor='text-green-500'
    bg='bg-green-100'
    {...props}
  />
);

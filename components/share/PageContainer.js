import { BackIconBtn } from "./IconBtn";

const PageContainer = ({ title, children }) => {
  return (
    <>
      <div className='flex items-center py-1'>
        <BackIconBtn className='lg:hidden' />
        <h3 className='pb-1 text-gray-500 text-sm lg:border-red-500 lg:border-b-2 lg:mx-3 md:text-base'>
          {title}
        </h3>
      </div>
      <div className='section-divide-y' />

      {children}
    </>
  );
};

export default PageContainer;

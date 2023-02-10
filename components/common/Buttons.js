import { Loading } from "components";

export const Button = ({
  type,
  isLoading,
  children,
  className,
  rounded,
  ...restPropps
}) => {
  return (
    <button
      type={type ? type : "button"}
      disabled={isLoading}
      className={`text-white py-3 px-8 flex items-center justify-center outline-none rounded-md active:scale-[.98] bg-red-500 ${
        rounded ? "rounded-3xl" : ""
      } ${className ? className : ""}
      `}
      {...restPropps}
    >
      {isLoading ? <Loading /> : children}
    </button>
  );
};

export const LoginBtn = ({ children, ...restPropps }) => (
  <Button type='submit' className='rounded-3xl w-44 mx-auto' {...restPropps}>
    {children}
  </Button>
);

export const SubmitModalBtn = ({ children, ...restPropps }) => (
  <Button
    type='submit'
    className='w-full max-w-xl mx-auto rounded-md btn lg:w-64 lg:ml-0'
    {...restPropps}
  >
    {children}
  </Button>
);

import { Loading } from 'components'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  isRounded?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
  //? Props
  const {
    type = 'button',
    isLoading = false,
    children,
    className = '',
    isRounded = false,
    ...restPropps
  } = props

  //? Render
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`button ${isRounded ? 'rounded-3xl' : ''} ${className}
      `}
      {...restPropps}
    >
      {isLoading ? <Loading /> : children}
    </button>
  )
}

interface LoginButtonProps extends ButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({
  children,
  ...restPropps
}) => (
  <Button type='submit' className='mx-auto rounded-3xl w-44' {...restPropps}>
    {children}
  </Button>
)

interface SubmitModalButtonProps extends ButtonProps {}

export const SubmitModalButton: React.FC<SubmitModalButtonProps> = ({
  children,
  ...restPropps
}) => (
  <Button
    type='submit'
    className='w-full max-w-xl mx-auto rounded-md btn lg:w-64 lg:ml-0'
    {...restPropps}
  >
    {children}
  </Button>
)

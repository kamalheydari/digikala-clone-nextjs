import { InlineLoading } from '@/components/ui'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean
  isRounded?: boolean
}

export const Button: React.FC<ButtonProps> = (props) => {
  // ? Props
  const { type = 'button', isLoading = false, children, className = '', isRounded = false, ...restPropps } = props

  // ? Render
  return (
    <button
      type={type}
      disabled={isLoading}
      className={`button ${isRounded ? 'rounded-3xl' : ''} ${className}
      `}
      {...restPropps}
    >
      {isLoading ? <InlineLoading /> : children}
    </button>
  )
}

interface LoginButtonProps extends ButtonProps {}

export const LoginButton: React.FC<LoginButtonProps> = ({ children, ...restPropps }) => (
  <Button type="submit" className="mx-auto w-44 rounded-3xl" {...restPropps}>
    {children}
  </Button>
)

interface SubmitModalButtonProps extends ButtonProps {}

export const SubmitModalButton: React.FC<SubmitModalButtonProps> = ({ children, ...restPropps }) => (
  <Button type="submit" className="btn mx-auto w-full max-w-xl rounded-md lg:ml-0 lg:w-64" {...restPropps}>
    {children}
  </Button>
)

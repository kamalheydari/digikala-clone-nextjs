import { Loading } from 'components'

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
      type={type ? type : 'button'}
      disabled={isLoading}
      className={`button ${rounded ? 'rounded-3xl' : ''} ${
        className ? className : ''
      }
      `}
      {...restPropps}
    >
      {isLoading ? <Loading /> : children}
    </button>
  )
}

export const LoginBtn = ({ children, ...restPropps }) => (
  <Button type='submit' className='rounded-3xl w-44 mx-auto' {...restPropps}>
    {children}
  </Button>
)

export const SubmitModalBtn = ({ children, ...restPropps }) => (
  <Button type='submit' className='submit-modal-button' {...restPropps}>
    {children}
  </Button>
)

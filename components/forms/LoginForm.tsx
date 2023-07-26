import { yupResolver } from '@hookform/resolvers/yup'
import { LoginButton, TextField } from 'components'
import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { ILoginForm } from 'types'
import { logInSchema } from 'utils'

interface Props {
  onSubmit: (data: ILoginForm) => void
  isLoading: boolean
}

const LoginForm: React.FC<Props> = (props) => {
  //? Props
  const { onSubmit, isLoading } = props

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    setFocus,
  } = useForm<ILoginForm>({
    resolver: yupResolver(logInSchema),
    defaultValues: { email: '', password: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('email')
  }, [])

  return (
    <form className='space-y-4' onSubmit={handleSubmit(onSubmit)}>
      <TextField
        control={control}
        errors={formErrors.email}
        placeholder='آدرس ایمیل'
        name='email'
        type='email'
        inputMode='email'
        direction='ltr'
      />

      <TextField
        control={control}
        errors={formErrors.password}
        type='password'
        placeholder='رمز عبور'
        name='password'
        direction='ltr'
      />

      <LoginButton isLoading={isLoading}>ورود</LoginButton>
    </form>
  )
}

export default LoginForm

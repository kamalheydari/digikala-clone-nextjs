import dynamic from 'next/dynamic'
import Head from 'next/head'
import { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { registerSchema } from 'utils'

import { useDispatch } from 'react-redux'
import { showAlert, userLogin } from 'store'

import { useCreateUserMutation } from 'services'

import { TextField, LoginBtn, RedirectToLogin, Logo } from 'components'

import { useDisclosure } from 'hooks'

function RegisterPage() {
  //? Assets
  const [isShowRedirectModal, redirectModalHandlers] = useDisclosure()
  const dispatch = useDispatch()
  const { query, replace } = useRouter()

  //? Create User
  const [createUser, { data, isSuccess, isError, isLoading, error }] =
    useCreateUserMutation()

  //? Handle Create User Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(userLogin(data.data.access_token))

      dispatch(
        showAlert({
          status: 'success',
          title: data.msg,
        })
      )

      reset()
      replace(query?.redirectTo || '/')
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError) {
      redirectModalHandlers.open()
    }
  }, [isError])

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(registerSchema),
    defaultValues: { name: '', email: '', password: '', confirmPassword: '' },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('name')
  }, [])

  //? Handlers
  const submitHander = async ({ name, email, password }) => {
    if (name && email && password) {
      await createUser({
        body: { name, email, password },
      })
    }
  }

  //? Render(s)
  return (
    <>
      <RedirectToLogin
        title='مشکلی در ثبت‌نام شما وجود دارد'
        text={error?.data.err}
        onClose={redirectModalHandlers.close}
        isShow={isShowRedirectModal}
      />
      <main className='grid items-center min-h-screen '>
        <Head>
          <title>دیجی‌کالا | ثبت‌نام</title>
        </Head>
        <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
          <Link passHref href='/'>
            <Logo className='h-24 mx-auto w-44' />
          </Link>
          <h2 className='text-gray-700'>ثبت‌نام</h2>
          <form
            className='space-y-4'
            onSubmit={handleSubmit(submitHander)}
            autoComplete='off'
          >
            <TextField
              control={control}
              errors={formErrors.name}
              placeholder='نام و نام خانوادگی'
              name='name'
            />

            <TextField
              control={control}
              errors={formErrors.email}
              type='email'
              placeholder='آدرس ایمیل'
              name='email'
              inputMode='email'
            />

            <TextField
              control={control}
              errors={formErrors.password}
              type='password'
              placeholder='رمز عبور'
              name='password'
            />

            <TextField
              control={control}
              errors={formErrors.confirmPassword}
              type='password'
              placeholder='تکرار رمز عبور'
              name='confirmPassword'
            />

            <LoginBtn isLoading={isLoading}>عضویت</LoginBtn>
          </form>

          <div>
            <p className='inline ml-2 text-gray-800'>حساب کاربری دارید؟</p>
            <Link
              href='/authentication/login'
              className='text-lg text-blue-400'
            >
              ورود
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(RegisterPage), { ssr: false })

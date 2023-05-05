import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { logInSchema } from 'utils'

import { useLoginMutation } from 'services'

import { useDispatch } from 'react-redux'
import { userLogin } from 'store'

import { TextField, LoginBtn, Logo, HandleResponse } from 'components'

function LoginPage() {
  //? Assets
  const dispatch = useDispatch()
  const { replace, query } = useRouter()

  //? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] =
    useLoginMutation()

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  //? Focus On Mount
  useEffect(() => {
    setFocus('email')
  }, [])

  //? Handlers
  const submitHander = async ({ email, password }) => {
    if (email && password) {
      await login({
        body: { email, password },
      })
    }
  }

  //? Render(s)
  return (
    <>
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error?.data?.err}
          message={data?.msg}
          onSuccess={() => {
            dispatch(userLogin(data.data.access_token))
            reset()
            replace(query?.redirectTo || '/')
          }}
        />
      )}
      <main className='grid items-center min-h-screen '>
        <Head>
          <title>دیجی‌کالا | ورود</title>
        </Head>
        <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
          <Link passHref href='/'>
            <Logo className='h-24 mx-auto w-44' />
          </Link>
          <h2 className='text-gray-700'>ورود</h2>
          <form
            className='space-y-4'
            onSubmit={handleSubmit(submitHander)}
            autoComplete='off'
          >
            <TextField
              errors={formErrors.email}
              placeholder='آدرس ایمیل'
              name='email'
              control={control}
              type='email'
              inputMode='email'
            />

            <TextField
              errors={formErrors.password}
              type='password'
              placeholder='رمز عبور'
              name='password'
              control={control}
            />

            <LoginBtn isLoading={isLoading}>ورود</LoginBtn>
          </form>

          <div>
            <p className='inline ml-2 text-gray-800'>هنوز ثبت‌نام نکردی؟</p>
            <Link
              href='/authentication/register'
              className='text-lg text-blue-400'
            >
              ثبت‌نام
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false })

import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { logInSchema } from 'utils'

import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { useDispatch } from 'react-redux'
import { userLogin, showAlert } from 'store'

import { useLoginMutation } from 'services'

import { TextField, LoginBtn, Logo } from 'components'

function LoginPage() {
  //? Assets
  const dispatch = useDispatch()
  const router = useRouter()

  //? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] =
    useLoginMutation()

  //? Handle Login User Response
  useEffect(() => {
    if (isSuccess) {
      if (data.data.root || data.data.role === 'admin') {
        dispatch(userLogin(data.data.access_token))

        dispatch(
          showAlert({
            status: 'success',
            title: data.msg,
          })
        )
        router.push('/admin')
        reset()
      } else {
        dispatch(
          showAlert({
            status: 'error',
            title: 'شما اجازه دسترسی به پنل ادمین را ندارید',
          })
        )
      }
    }
  }, [isSuccess])

  useEffect(() => {
    if (isError)
      dispatch(
        showAlert({
          status: 'error',
          title: error?.data.err,
        })
      )
  }, [isError])

  //? Form Hook
  const {
    handleSubmit,
    control,
    formState: { errors: formErrors },
    reset,
    setFocus,
  } = useForm({
    resolver: yupResolver(logInSchema),
    defaultValues: { name: '', password: '' },
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
    <main className='grid items-center min-h-screen '>
      <Head>
        <title>مدیریت | ورود</title>
      </Head>
      <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
        <Link passHref href='/'>
          <Logo className='h-24 mx-auto w-44' />
        </Link>
        <h2>ورود</h2>
        <form className='space-y-4' onSubmit={handleSubmit(submitHander)}>
          <TextField
            control={control}
            errors={formErrors.email}
            placeholder='آدرس ایمیل'
            name='email'
            type='email'
            inputMode='email'
          />

          <TextField
            control={control}
            errors={formErrors.password}
            type='password'
            placeholder='رمز عبور'
            name='password'
          />

          <LoginBtn isLoading={isLoading}>ورود</LoginBtn>
        </form>
      </section>

      <div className='fixed max-w-xs px-2 py-3 bg-white border rounded-lg shadow-lg top-5 right-5'>
        <h5 className='mb-2 text-amber-600'>
          برای مشاهده داشبورد مدیریت میتوانید از آدرس ایمیل و رمز عبور زیر
          استفاده کنید.
        </h5>
        <div className='text-left'>
          <span className='text-sm text-zinc-500'>Email: admin@gmail.com</span>
          <br />
          <span className='text-sm text-zinc-500'>Password: 123456</span>
        </div>
      </div>
    </main>
  )
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false })

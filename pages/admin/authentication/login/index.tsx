import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { getErrorMessage } from 'utils'

import { SubmitHandler } from 'react-hook-form'

import { useDispatch } from 'react-redux'
import { userLogin, showAlert } from 'store'

import { useLoginMutation } from 'services'

import { LoginForm, Logo } from 'components'

import type { ILoginForm } from 'types'
import type { NextPage } from 'next'

const LoginPage: NextPage = () => {
  //? Assets
  const dispatch = useDispatch()
  const { push } = useRouter()

  //? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] =
    useLoginMutation()

  //? Handle Login User Response
  useEffect(() => {
    if (isSuccess) {
      if (data?.data.root || data?.data.role === 'admin') {
        dispatch(userLogin(data?.data.access_token))

        dispatch(
          showAlert({
            status: 'success',
            title: data.msg,
          })
        )
        push('/admin')
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
    if (isError && error)
      dispatch(
        showAlert({
          status: 'error',
          title: getErrorMessage(error),
        })
      )
  }, [isError])

  //? Handlers
  const submitHander: SubmitHandler<ILoginForm> = (data) => {
    login({
      body: data,
    })
  }

  //? Render(s)
  return (
    <>
      <main className='grid items-center min-h-screen '>
        <Head>
          <title>مدیریت | ورود</title>
        </Head>
        <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
          <Link passHref href='/'>
            <Logo className='h-24 mx-auto w-44' />
          </Link>
          <h2>ورود</h2>
          <LoginForm isLoading={isLoading} onSubmit={submitHander} />
        </section>

        <div className='fixed max-w-xs px-2 py-3 bg-white border rounded-lg shadow-lg top-5 right-5'>
          <h5 className='mb-2 text-amber-600'>
            برای مشاهده داشبورد مدیریت میتوانید از آدرس ایمیل و رمز عبور زیر
            استفاده کنید.
          </h5>
          <div className='text-left'>
            <span className='text-sm text-zinc-500'>
              Email: admin@gmail.com
            </span>
            <br />
            <span className='text-sm text-zinc-500'>Password: 123456</span>
          </div>
        </div>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false })

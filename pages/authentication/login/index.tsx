import { useEffect } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { SubmitHandler, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'

import { logInSchema } from 'utils'

import { useLoginMutation } from 'services'

import { useDispatch } from 'react-redux'
import { userLogin } from 'store'

import {
  TextField,
  LoginButton,
  Logo,
  HandleResponse,
  LoginForm,
} from 'components'
import { ILoginForm } from 'types'

function LoginPage() {
  //? Assets
  const dispatch = useDispatch()
  const { replace, query } = useRouter()

  //? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] =
    useLoginMutation()

  //? Handlers
  const submitHander: SubmitHandler<ILoginForm> = ({ email, password }) => {
    login({
      body: { email, password },
    })
  }

  const onSuccess = () => {
    if (data) dispatch(userLogin(data.data.access_token))

    replace(query?.redirectTo?.toString() || '/')
  }

  //? Render(s)
  return (
    <>
      {/*  Handle Login Response */}
      {(isSuccess || isError) && (
        <HandleResponse
          isError={isError}
          isSuccess={isSuccess}
          error={error}
          message={data?.msg}
          onSuccess={onSuccess}
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

          <LoginForm isLoading={isLoading} onSubmit={submitHander} />

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

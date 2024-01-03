import dynamic from 'next/dynamic'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { SubmitHandler } from 'react-hook-form'

import { useLoginMutation } from 'services'

import { HandleResponse, LoginForm } from 'components'
import { Logo } from 'icons'

import type { ILoginForm } from 'types'
import type { NextPage } from 'next'

const LoginPage: NextPage = () => {
  // ? Assets
  const { replace, query } = useRouter()

  // ? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation()

  // ? Handlers
  const submitHander: SubmitHandler<ILoginForm> = (data) => {
    login({
      body: data,
    })
  }

  const onSuccess = () => replace(query?.redirectTo?.toString() || '/admin')

  // ? Render(s)
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

      <main className="grid min-h-screen items-center ">
        <Head>
          <title>مدیریت | ورود</title>
        </Head>
        <section className="container max-w-xl space-y-6 px-12 py-6 lg:rounded-lg lg:border lg:border-gray-100 lg:shadow">
          <Link passHref href="/">
            <Logo className="mx-auto h-24 w-44" />
          </Link>
          <h2>ورود</h2>
          <LoginForm isLoading={isLoading} onSubmit={submitHander} />
        </section>

        <div className="fixed right-5 top-5 max-w-xs rounded-lg border bg-white px-2 py-3 shadow-lg">
          <h5 className="mb-2 text-amber-600">
            برای مشاهده داشبورد مدیریت میتوانید از آدرس ایمیل و رمز عبور زیر استفاده کنید.
          </h5>
          <div className="text-left">
            <span className="text-sm text-zinc-500">Email: admin@gmail.com</span>
            <br />
            <span className="text-sm text-zinc-500">Password: 123456</span>
          </div>
        </div>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false })

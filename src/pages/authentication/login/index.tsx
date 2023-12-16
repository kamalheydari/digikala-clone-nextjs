import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Head from 'next/head'

import { SubmitHandler } from 'react-hook-form'

import { useLoginMutation } from 'services'

import { HandleResponse, LoginForm } from 'components'
import { Logo } from 'icons'

import type { ILoginForm } from 'types'

function LoginPage() {
  // ? Assets
  const { replace, query } = useRouter()

  // ? Login User
  const [login, { data, isSuccess, isError, isLoading, error }] = useLoginMutation()

  // ? Handlers
  const submitHander: SubmitHandler<ILoginForm> = ({ email, password }) => {
    login({
      body: { email, password },
    })
  }

  const onSuccess = () => replace(query?.redirectTo?.toString() || '/')

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
      <main className="grid min-h-screen items-center">
        <Head>
          <title>دیجی‌کالا | ورود</title>
        </Head>
        <section className="container max-w-xl space-y-6 px-12 py-6 lg:rounded-lg lg:border lg:border-gray-300 lg:shadow">
          <Link passHref href="/">
            <Logo className="mx-auto h-24 w-44" />
          </Link>
          <h2 className="text-gray-800">ورود</h2>

          <LoginForm isLoading={isLoading} onSubmit={submitHander} />

          <div>
            <p className="ml-2 inline text-gray-900">هنوز ثبت‌نام نکردی؟</p>
            <Link href="/authentication/register" className="text-lg text-blue-500">
              ثبت‌نام
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

export default dynamic(() => Promise.resolve(LoginPage), { ssr: false })

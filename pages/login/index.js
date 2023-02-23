import { useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import Head from "next/head";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import { useLoginMutation } from "app/api/userApi";
import { useDispatch } from "react-redux";
import { userLogin } from "app/slices/user.slice";

import { TextField, LoginBtn, Logo, HandleResponse } from "components";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Login User
  const [
    login,
    { data, isSuccess, isError, isLoading, error },
  ] = useLoginMutation();

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(validation.logInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  //? Focus On Mount
  useEffect(() => {
    setFocus("email");
  }, []);

  //? Handlers
  const submitHander = async ({ email, password }) => {
    if (email && password) {
      await login({
        body: { email, password },
      });
    }
  };

  //? Render
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
            dispatch(userLogin(data.data.access_token));
            reset();
            router.push("/");
          }}
        />
      )}
      <main className='grid items-center min-h-screen '>
        <Head>
          <title>دیجی‌کالا | ورود</title>
        </Head>
        <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
          <Link passHref href='/'>
            <a>
              <Logo className='h-24 mx-auto w-44' />
            </a>
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
            <Link href='/register'>
              <a className='text-lg text-blue-400 '>ثبت‌نام</a>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

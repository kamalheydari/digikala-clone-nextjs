import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import { useLoginMutation } from "app/api/userApi";
import { useDispatch } from "react-redux";
import { showAlert } from "app/slices/alert.slice";
import { userLogin } from "app/slices/user.slice";

import { TextField, LoginBtn } from "components";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Login User
  const [
    login,
    { data, isSuccess, isError, isLoading, error },
  ] = useLoginMutation();

  //? Handle Login Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(userLogin(data.data.access_token));

      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );

      reset();
      router.push("/");
    }
  }, [isSuccess]);

  useEffect(() => {
    if (isError)
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
  }, [isError]);

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
    <main className='grid items-center min-h-screen '>
      <Head>
        <title>دیجی‌کالا | ورود</title>
      </Head>
      <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
        <div className='relative h-24 mx-auto w-44'>
          <Link passHref href='/'>
            <a>
              <Image src='/icons/logo.svg' layout='fill' alt='دیجی‌کالا' />
            </a>
          </Link>
        </div>
        <h2 className='text-gray-700'>ورود</h2>
        <form
          className='space-y-4'
          onSubmit={handleSubmit(submitHander)}
          autoComplete='off'
        >
          <TextField
            errors={formErrors.email}
            type='text'
            placeholder='آدرس ایمیل'
            name='email'
            control={control}
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
  );
}

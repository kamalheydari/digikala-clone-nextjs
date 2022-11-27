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
import {  userLogin } from "app/slices/user.slice";

import { Input, Loading } from "components";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Login User Query
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
    register,
    formState: { errors: formErrors },
    reset,
    setFocus,
  } = useForm({
    resolver: yupResolver(validation.logInSchema),
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
        <form className='space-y-5' onSubmit={handleSubmit(submitHander)}>
          <Input
            register={register}
            errors={formErrors.email}
            type='text'
            placeholder='آدرس ایمیل'
            name='email'
          />

          <Input
            register={register}
            errors={formErrors.password}
            type='password'
            placeholder='رمز عبور'
            name='password'
          />

          <button
            className='mx-auto w-44 btn rounded-3xl '
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "ورود"}
          </button>
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

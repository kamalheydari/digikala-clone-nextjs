import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import { useDispatch } from "react-redux";
import { showAlert } from "app/slices/alert.slice";
import { useCreateUserMutation } from "app/api/userApi";
import { openModal } from "app/slices/modal.slice";
import { userLogin } from "app/slices/user.slice";

import { TextField, LoginBtn, RedirectToLogin } from "components";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Create User
  const [
    createUser,
    { data, isSuccess, isError, isLoading, error },
  ] = useCreateUserMutation();

  //? Handle Create User Response
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
    if (isError) {
      dispatch(
        openModal({
          isShow: true,
          type: "redirect",
          title: "مشکلی در ثبت‌نام شما وجود دارد",
          text: error?.data.err,
        })
      );
    }
  }, [isError]);

  //? Form Hook
  const {
    handleSubmit,
    formState: { errors: formErrors },
    reset,
    setFocus,
    control,
  } = useForm({
    resolver: yupResolver(validation.registerSchema),
    defaultValues: { name: "", email: "", password: "", confirmPassword: "" },
  });

  //? Focus On Mount
  useEffect(() => {
    setFocus("name");
  }, []);

  //? Handlers
  const submitHander = async ({ name, email, password }) => {
    if (name && email && password) {
      await createUser({
        body: { name, email, password },
      });
    }
  };

  return (
    <>
      <RedirectToLogin />
      <main className='grid items-center min-h-screen '>
        <Head>
          <title>دیجی‌کالا | ثبت‌نام</title>
        </Head>
        <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
          <div className='relative h-24 mx-auto w-44'>
            <Link passHref href='/'>
              <a>
                <Image src='/icons/logo.svg' layout='fill' alt='دیجی‌کالا' />
              </a>
            </Link>
          </div>
          <h2 className='text-gray-700'>ثبت‌نام</h2>
          <form
            className='space-y-4'
            onSubmit={handleSubmit(submitHander)}
            autoComplete='off'
          >
            <TextField
              control={control}
              errors={formErrors.name}
              type='text'
              placeholder='نام و نام خانوادگی'
              name='name'
            />

            <TextField
              control={control}
              errors={formErrors.email}
              type='text'
              placeholder='آدرس ایمیل'
              name='email'
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
            <Link href='/login'>
              <a className='text-lg text-blue-400 '>ورود</a>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}

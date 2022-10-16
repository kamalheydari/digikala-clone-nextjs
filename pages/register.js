import Head from "next/head";
import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import validation from "utils/validation";

import { useDispatch } from "react-redux";
import { userLogin } from "app/slices/user.slice";
import { showAlert } from "app/slices/alert.slice";
import { useCreateUserMutation } from "app/api/userApi";

import { Input, Loading } from "components";

import { openModal } from "app/slices/modal.slice";

export default function RegisterPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Create User Query
  const [
    createUser,
    { data, isSuccess, isError, isLoading, error },
  ] = useCreateUserMutation();

  //? Handle Create User Response
  useEffect(() => {
    if (isSuccess) {
      dispatch(
        showAlert({
          status: "success",
          title: data.msg,
        })
      );
      dispatch(userLogin(data.data));
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
    register,
    formState: { errors: formErrors },
    reset,
    setFocus,
  } = useForm({
    resolver: yupResolver(validation.registerSchema),
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
        <form className='space-y-5' onSubmit={handleSubmit(submitHander)}>
          <Input
            register={register}
            errors={formErrors.name}
            type='text'
            placeholder='نام و نام خانوادگی'
            name='name'
          />

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

          <Input
            register={register}
            errors={formErrors.confirmPassword}
            type='password'
            placeholder='تکرار رمز عبور'
            name='confirmPassword'
          />

          <button
            className='mx-auto w-44 btn rounded-3xl '
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "عضویت"}
          </button>
        </form>

        <div>
          <p className='inline ml-2 text-gray-800'>حساب کاربری دارید؟</p>
          <Link href='/login'>
            <a className='text-lg text-blue-400 '>ورود</a>
          </Link>
        </div>
      </section>
    </main>
  );
}

import { useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch } from "react-redux";
import { usePostDataMutation } from "app/slices/fetchApi.slice";
import { userLogin } from "app/slices/user.slice";
import { showAlert } from "app/slices/alert.slice";

import { DisplayError, Loading } from "components";

//? Validation Schema
import validation from "utils/validation";
import Head from "next/head";

export default function LoginPage() {
  const dispatch = useDispatch();
  const router = useRouter();

  //? Post query
  const [
    postData,
    { data, isSuccess, isError, isLoading, error },
  ] = usePostDataMutation();

  //? Handle Response
  useEffect(() => {
    if (isSuccess) {
      if (data.data.user.root || data.data.user.role === "admin") {
        dispatch(userLogin(data.data));
        dispatch(
          showAlert({
            status: "success",
            title: data.msg,
          })
        );
        router.push("/admin");
        reset();
      } else {
        dispatch(
          showAlert({
            status: "error",
            title: "شما اجازه دسترسی به پنل ادمین را ندارید",
          })
        );
      }
    }
    if (isError)
      dispatch(
        showAlert({
          status: "error",
          title: error?.data.err,
        })
      );
  }, [isSuccess, isError]);

  //? Form Hook
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(validation.logInSchema),
  });

  //? Handlers
  const submitHander = async ({ email, password }) => {
    if (email && password) {
      await postData({
        url: "/api/auth/login",
        body: { email, password },
        token: "",
      });
    }
  };

  return (
    <main className='grid items-center min-h-screen '>
      <Head>
        <title>مدیریت | ورود</title>
      </Head>
      <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
        <div className='relative h-24 mx-auto w-44'>
          <Link passHref href='/'>
            <a>
              <Image src='/icons/logo.svg' layout='fill' />
            </a>
          </Link>
        </div>
        <h2>ورود</h2>
        <form className='space-y-5' onSubmit={handleSubmit(submitHander)}>
          <div>
            <input
              className='input'
              type='text'
              placeholder='آدرس ایمیل'
              {...register("email")}
            />
            <DisplayError errors={formErrors.email} />
          </div>

          <div>
            <input
              className='input'
              type='password'
              placeholder='رمز عبور'
              {...register("password")}
            />
            <DisplayError errors={formErrors.password} />
          </div>

          <button
            className='btn mx-auto w-full max-w-[200px]'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "ورود"}
          </button>
        </form>

        <div>
          <p className='inline ml-2'>هنوز ثبت‌نام نکردی؟</p>
          <Link href='/register'>
            <a className='text-lg text-blue-400 '>ثبت‌نام</a>
          </Link>
        </div>
      </section>

      <div className='fixed max-w-xs px-2 py-3 bg-white border rounded-lg shadow-lg top-5 right-5'>
        <h5 className='mb-2 text-amber-600'>
          برای مشاهده داشبورد مدیریت میتوانید از آدرس ایمیل و رمز عبور زیر
          استفاده کنید.
        </h5>
        <div className="text-left">
        <span className="text-sm text-zinc-500">Email: admin@gmail.com</span>
        <br />
        <span className="text-sm text-zinc-500">Password: 123456</span>
          
        </div>
      </div>
    </main>
  );
}

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Head from "next/head";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { usePostDataMutation } from "app/slices/fetchApi.slice";
import { DisplayError, Loading } from "components";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { userLogin } from "app/slices/user.slice";
import { openModal } from "app/slices/modal.slice";

//? Validation Schema
import validation from "utils/validation";

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
      dispatch(userLogin(data.data));
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "success",
          text: data.msg,
        })
      );
      router.push("/");
      reset();
    }
    if (isError)
      dispatch(
        openModal({
          isShow: true,
          type: "alert",
          status: "error",
          text: error?.data.err,
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
        <title>
        دیجی‌کالا | ورود
        </title>
      </Head>
      <section className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
        <div className='relative h-24 mx-auto w-44'>
          <Link passHref href='/'>
            <a>
              <Image src='/icons/logo.svg' layout='fill' />
            </a>
          </Link>
        </div>
        <h2 className='text-gray-700'>ورود</h2>
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

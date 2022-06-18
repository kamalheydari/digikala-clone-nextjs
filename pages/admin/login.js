import { useEffect } from "react";

import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";

import { useDispatch } from "react-redux";
import { usePostDataMutation } from "app/slices/fetchApiSlice";
import { userLogin } from "app/slices/authSlice";
import { openModal } from "app/slices/modalSlice";

import { DisplayError, Loading } from "components";

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
      if (data.data.user.root && data.data.user.role === "admin") {
        dispatch(userLogin(data.data));
        dispatch(
          openModal({
            isShow: true,
            type: "alert",
            status: "success",
            text: data.msg,
          })
        );
        router.push("/admin");
        reset();
      } else {
        dispatch(
          openModal({
            isShow: true,
            type: "alert",
            status: "error",
            text: "شما اجازه دسترسی به پنل ادمین را ندارید",
          })
        );
      }
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
    <div className=' grid items-center min-h-screen '>
      <div className='container max-w-xl px-12 py-6 space-y-6 lg:border lg:border-gray-100 lg:rounded-lg lg:shadow'>
        <div className='relative w-44 h-24 mx-auto'>
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
            <a className='text-blue-400 text-lg '>ثبت‌نام</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

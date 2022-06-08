import Link from "next/link";
import Image from "next/image";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { usePostDataMutation } from "app/slices/fetchApiSlice";
import { DisplayError, Loading } from "components";
import { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { userLogin } from "app/slices/authSlice";

//? Validation Schema
const schema = Yup.object().shape({
  email: Yup.string()
    .required("آدرس ایمیل لازم است ثبت شود")
    .email("آدرس ایمیل وارد شده معتبر نیست"),
  password: Yup.string()
    .required("رمز عبور لازم است ثبت شود")
    .min(6, "رمز عبور باید بیشتر از 5 کارکتر باشد"),
});

export default function LoginPage() {
  const dispatch =useDispatch()
  //? Post query
  const [
    postData,
    { data, isSuccess, isError, isLoading, error },
  ] = usePostDataMutation();

  //? Handle Response
  useEffect(() => {
    if (isSuccess) {
      toast.success(data.msg);
      dispatch(userLogin(data.data));
      reset();
    }
    if (isError) toast.error(error?.data.err);
  }, [isSuccess, isError]);

  //? Form Hook
  const {
    handleSubmit,
    register,
    formState: { errors: formErrors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  //? Handlers
  const submitHander = async ({  email, password }) => {
    if (email && password ) {
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
              <Image src='/images/logo.svg' layout='fill' />
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
            className='btn mx-auto w-60'
            type='submit'
            disabled={isLoading}
          >
            {isLoading ? <Loading /> : "عضویت"}
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

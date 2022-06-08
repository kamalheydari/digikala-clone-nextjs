import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import { usePostDataMutation } from "app/slices/fetchApiSlice";
import { useDispatch } from "react-redux";
import { userLogin } from "app/slices/authSlice";

import { DisplayError, Loading } from "components";
import toast from "react-hot-toast";

//? Validation Schema
const schema = Yup.object().shape({
  name: Yup.string()
    .required("نام و نام خانوادگی  لازم است ثبت شود")
    .min(3, "نام و نام خانوادگی  باید بیشتر از 2 کارکتر باشد"),
  email: Yup.string()
    .required("آدرس ایمیل لازم است ثبت شود")
    .email("آدرس ایمیل وارد شده معتبر نیست"),
  password: Yup.string()
    .required("رمز عبور لازم است ثبت شود")
    .min(6, "رمز عبور باید بیشتر از 5 کارکتر باشد"),
  confirmPassword: Yup.string()
    .required("تکرار کلمه عبور الزامی می باشد")
    .oneOf([Yup.ref("password"), null], "تکرار کلمه عبور صحیح نیست"),
});

export default function RegisterPage() {
  const dispatch = useDispatch();

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
  const submitHander = async ({ name, email, password, confirmPassword }) => {
    if (name && email && password && confirmPassword) {
      await postData({
        url: "/api/auth/register",
        body: { name, email, password },
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
        <h2>ثبت‌نام</h2>
        <form className='space-y-5' onSubmit={handleSubmit(submitHander)}>
          <div>
            <input
              className='input'
              type='text'
              name='name'
              placeholder='نام و نام خانوادگی'
              {...register("name")}
            />
            <DisplayError errors={formErrors.name} />
          </div>

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

          <div>
            <input
              className='input'
              type='password'
              placeholder='تکرار رمز عبور'
              {...register("confirmPassword")}
            />
            <DisplayError errors={formErrors.confirmPassword} />
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
          <p className='inline ml-2'>حساب کاربری دارید؟</p>
          <Link href='/login'>
            <a className='text-blue-400 text-lg '>ورود</a>
          </Link>
        </div>
      </div>
    </div>
  );
}

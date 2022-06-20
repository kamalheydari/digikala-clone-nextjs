import * as Yup from "yup";

//? User Validation
const registerSchema = Yup.object().shape({
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

const logInSchema = Yup.object().shape({
  email: Yup.string()
    .required("آدرس ایمیل لازم است ثبت شود")
    .email("آدرس ایمیل وارد شده معتبر نیست"),
  password: Yup.string()
    .required("رمز عبور لازم است ثبت شود")
    .min(6, "رمز عبور باید بیشتر از 5 کارکتر باشد"),
});

const nameSchema = Yup.object().shape({
  name: Yup.string()
    .required("نام و نام خانوادگی  لازم است ثبت شود")
    .min(3, "نام و نام خانوادگی  باید بیشتر از 2 کارکتر باشد"),
});

const mobileSchema = Yup.object().shape({
  mobile: Yup.string()
    .required("شماره تلفن همراه  لازم است ثبت شود")
    .min(11, "شماره تلفن همراه باید 11 رقم باشد")
    .max(11, "شماره تلفن همراه باید 11 رقم باشد"),
});

const categorySchema = Yup.object().shape({
  name: Yup.string().required("نام دسته‌بندی نباید خالی باشد"),
  slug: Yup.string().required("نام مسیر نباید خالی باشد"),
});

const validation = {
  registerSchema,
  logInSchema,
  nameSchema,
  mobileSchema,
  categorySchema,
};

export default validation;

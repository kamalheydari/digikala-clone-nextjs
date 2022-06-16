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

const validation = { registerSchema, logInSchema };

export default validation;

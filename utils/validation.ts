import * as Yup from 'yup'

export const registerSchema = Yup.object().shape({
  name: Yup.string()
    .required('نام و نام خانوادگی  لازم است ثبت شود')
    .min(3, 'نام و نام خانوادگی  باید بیشتر از 2 کارکتر باشد'),
  email: Yup.string()
    .required('آدرس ایمیل لازم است ثبت شود')
    .email('آدرس ایمیل وارد شده معتبر نیست'),
  password: Yup.string()
    .required('رمز عبور لازم است ثبت شود')
    .min(6, 'رمز عبور باید بیشتر از 5 کارکتر باشد'),
  confirmPassword: Yup.string()
    .required('تکرار کلمه عبور الزامی می باشد')
    .oneOf([Yup.ref('password'), null], 'تکرار کلمه عبور صحیح نیست'),
})

export const logInSchema = Yup.object().shape({
  email: Yup.string()
    .required('آدرس ایمیل لازم است ثبت شود')
    .email('آدرس ایمیل وارد شده معتبر نیست'),
  password: Yup.string()
    .required('رمز عبور لازم است ثبت شود')
    .min(6, 'رمز عبور باید بیشتر از 5 کارکتر باشد'),
})

export const nameSchema = Yup.object().shape({
  name: Yup.string()
    .required('نام و نام خانوادگی  لازم است ثبت شود')
    .min(3, 'نام و نام خانوادگی  باید بیشتر از 2 کارکتر باشد'),
})

export const mobileSchema = Yup.object().shape({
  mobile: Yup.string()
    .required('شماره تلفن همراه  لازم است ثبت شود')
    .min(11, 'شماره تلفن همراه باید 11 رقم باشد')
    .max(11, 'شماره تلفن همراه باید 11 رقم باشد'),
})

export const categorySchema = Yup.object().shape({
  name: Yup.string().required('نام دسته‌بندی نباید خالی باشد'),
  slug: Yup.string().required('نام مسیر نباید خالی باشد'),
  image: Yup.string()
    .required('آدرس تصویر را وارد کنید')
    .url('آدرس تصویر معتبر نیست')
    .matches(
      /\.(gif|jpe?g|png|webp)$/i,
      'آدرس تصویر باید یک URL تصویر معتبر باشد'
    ),
})

export const sliderSchema = Yup.object().shape({
  title: Yup.string().required('نام اسلایدر نباید خالی باشد'),
  image: Yup.object().shape({
    url: Yup.string()
      .required('آدرس تصویر را وارد کنید')
      .url('آدرس تصویر معتبر نیست')
      .matches(
        /\.(gif|jpe?g|png|webp)$/i,
        'آدرس تصویر باید یک URL تصویر معتبر باشد'
      ),
  }),
})

export const bannerSchema = Yup.object().shape({
  title: Yup.string().required('نام بنر نباید خالی باشد'),
  image: Yup.object().shape({
    url: Yup.string()
      .required('آدرس تصویر را وارد کنید')
      .url('آدرس تصویر معتبر نیست')
      .matches(
        /\.(gif|jpe?g|png|webp)$/i,
        'آدرس تصویر باید یک URL تصویر معتبر باشد'
      ),
  }),
})

export const addressSchema = Yup.object().shape({
  province: Yup.object().shape({
    name: Yup.string().required('لطفا استان محل زندگی خود را انتخاب کنید'),
  }),
  city: Yup.object().shape({
    name: Yup.string().required('لطفا شهرستان محل زندگی خود را انتخاب کنید'),
  }),
  street: Yup.string().required('نام خیابان نباید خالی باشد'),
  postalCode: Yup.string().required('لطفا کد پستی خود را وارد کنید'),
})

export const reviewSchema = Yup.object().shape({
  title: Yup.string()
    .required('عنوان نظر نباید خالی باشد')
    .min(4, 'عنوان نظر نباید کمتر از 4 حرف باشد'),
  comment: Yup.string()
    .required('متن نظر نباید خالی باشد')
    .min(4, 'متن نظر نباید کمتر از 4 حرف باشد'),
})

export const productSchema = Yup.object().shape({
  title: Yup.string().required('عنوان الزامی است'),
  description: Yup.string(),
  price: Yup.number().required('قیمت الزامی است'),
  discount: Yup.number(),
  images: Yup.array()
    .of(
      Yup.object().shape({
        url: Yup.string()
          .required()
          .url('آدرس تصویر معتبر نیست')
          .matches(
            /\.(gif|jpe?g|png|webp)$/i,
            'آدرس تصویر باید یک URL تصویر معتبر باشد'
          ),
      })
    )
    .min(1, 'حداقل یک تصویر الزامی است')
    .required('تصویر الزامی است'),
  inStock: Yup.number().required('موجودی الزامی است'),
  info: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('عنوان ویژگی‌ها الزامی است'),
      description: Yup.string(),
    })
  ),
  specification: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('عنوان مشخصات الزامی است'),
      value: Yup.string(),
    })
  ),
})

export const detailsSchema = Yup.object().shape({
  info: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('نام ویژگی الزامی است'),
    })
  ),
  specification: Yup.array().of(
    Yup.object().shape({
      title: Yup.string().required('نام مشخصات الزامی است'),
    })
  ),
  optionsType: Yup.string().required('نوع انتخاب را مشخص کنید'),
})

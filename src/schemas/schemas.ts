import * as yup from "yup";

const passwordRules = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{5,}$/;
const phoneNumberRules = /^[0-9]{11}$/;

export const registrationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('شماره موبایل الزامی است.')
    .matches(phoneNumberRules, 'شماره موبایل معتبر نیست')
});


export const loginSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('شماره موبایل الزامی است.')
    .matches(phoneNumberRules, 'شماره موبایل معتبر نیست')
})


export const verifySchema = yup.object().shape({
  otp: yup
    .string()
    .required('کد ارسال شده به موبایل را وارد کنید.')
    .max(6, "کد 6 رقمی ارسال شده به موبایل را وارد کنید.")
})


export const loginPasswordSchema = yup.object().shape({
  phoneNumber: yup
  .string()
  .required('شماره موبایل الزامی است.')
  .matches(phoneNumberRules, 'شماره موبایل معتبر نیست'),
  password: yup
    .string()
    .required('رمز عبور الزامی است.')
})


export const forgetPasswordSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('شماره موبایل الزامی است.')
    .matches(phoneNumberRules, 'شماره موبایل معتبر نیست')
})


export const setPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required('رمز عبور الزامی است.')
    .min(8, "رمز عبور حداقل باید 8 کاراکتر باشد!")
    .matches(passwordRules, "لطفا رمز عبور قوی تری انتخاب کنید."),
  confirmPassword: yup
    .string()
    .required('تکرار رمز عبور الزامی است.')
    .oneOf([yup.ref("password"), null], "عدم تطابق با رمز وارد شده"),
});


export const changePasswordSchema = yup.object().shape({
  oldPassword: yup
    .string()
    .required('رمز عبور قبلی را وارد کنید.'),
  newPassword: yup
    .string()
    .required('رمز عبور جدید را وارد کنید.')
    .min(8, "رمز عبور حداقل باید 8 کاراکتر باشد!")
    .matches(passwordRules, "لطفا رمز عبور قوی تری انتخاب کنید."),
  confirmNewPassword: yup
    .string()
    .required('تکرار رمز عبور الزامی است.')
    .oneOf([yup.ref("newPassword"), null], "عدم تطابق با رمز وارد شده"),
});


export const completeProfileSchema = yup.object().shape({
  photo: yup
    .mixed()
    .required('File is required'),
  firstName: yup
    .string()
    .required('نام خود را وارد کنید.'),
  lastName: yup
    .string()
    .required('نام خانوادگی را وارد کنید.'),
});


export const authenticationSchema = yup.object().shape({
  phoneNumber: yup
    .string()
    .required('شماره موبایل الزامی است.'),
  identity: yup
    .string()
    .required('کد ملی الزامی است.'),
  creditCard: yup
    .string()
    .required('شماره کارت بانکی الزامی است.')
});


export const walletSchema = yup.object().shape({
  payment: yup
    .string()
    .required('لطفا مبلغ مورد نظر را وارد کنید.'),
});

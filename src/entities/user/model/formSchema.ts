import * as yup from 'yup';

export const userSchema = yup.object().shape({
  name: yup.string().required().max(64),
  surName: yup.string().required().max(64),
  email: yup.string().email().required(),
  fullName: yup.string().required().max(130),
  password: yup.string().min(6).required(),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref('password')], 'Пароли не совпадают')
    .required('Подтвердите пароль'),
  birthDate: yup.date().nullable(),
  telephone: yup
    .string()
    .nullable()
    .matches(/^\+?\d{10,15}$/, 'Некорректный телефон'),
  employment: yup.string().nullable(),
  userAgreement: yup.boolean().oneOf([true], 'Необходимо согласие'),
});
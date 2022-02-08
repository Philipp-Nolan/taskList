import * as yup from 'yup';


export const NAME_SCHEMA = yup
    .string()
    .matches(/^[A-Z][a-z]{0,15}$/, 'Must start with a capital letter')
    .required();

export const PASSWORD_SCHEMA = yup
    .string()
    .matches(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$^&*-])/,
        'Password must contain upper and lower latin characters, numbers and symbols',
    )
    .matches(/^.{8,}$/, 'Password must contain  8 characters')
    .required();

export const UPD_PASSWORD_SCHEMA = yup
    .string()
    .matches(
        /(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[#?!@$^&*-])/,
        'Password must contain upper and lower latin characters, numbers and symbols',
    )
    .matches(/^.{8,}$/, 'Password must contain  8 characters')

export const TASK = yup
    .string()
    .matches(
        /(?=.*[A-Za-z0-9])/,
        'Minimal length 1 symbol',
    )
    .matches(/^.{1,}$/, 'Minimal length 1 symbol')
    .required();

export const SIGN_UP_SCHEMA = yup.object({
    firstname: NAME_SCHEMA,
    lastname: NAME_SCHEMA,
    nickname: NAME_SCHEMA,
    email: yup.string().email().required(),
    password: PASSWORD_SCHEMA,
});

export const UPDATE_SCHEMA = yup.object({
    firstname: NAME_SCHEMA,
    lastname: NAME_SCHEMA,
    nickname: NAME_SCHEMA,
    password: UPD_PASSWORD_SCHEMA,
});

export const LOGIN_SCHEMA = yup.object({
    email: yup.string().email().required(),
    password: PASSWORD_SCHEMA,
});

export const TASK_SCHEMA = yup.object({
    title: TASK,
    body: TASK,
});

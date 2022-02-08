import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import * as authActionCreators from '../../../actions/authCreators'
import style from '../../../common/style.module.sass'
import { SIGN_UP_SCHEMA } from '../../../utils/validationSchemas';

function SignUp(props) {
    const { signUpAuth } = props
    function onSubmit(values, actions) {
        const data = {
            firstName: values.firstname,
            lastName: values.lastname,
            nickname: values.nickname,
            email: values.email,
            password: values.password,
        }
        signUpAuth(data)
        actions.setSubmitting(false);
        actions.resetForm()
    }
    return (
        <div className={style.formWrapper}>
            <Formik
                initialValues={{
                    firstname: '',
                    lastname: '',
                    nickname: '',
                    email: '',
                    password: '',
                }}
                validationSchema={SIGN_UP_SCHEMA}
                onSubmit={onSubmit}>
                {formProps => (
                    <Form className={style.formSignUp} method="post">
                        <h1 className={style.formTitle}>Sign Up</h1>
                        <Field
                            as={TextField}
                            type="text"
                            name="firstname"
                            variant="filled"
                            color="secondary"
                            label="Write first name"
                            className={style.fieldForm}
                        />
                        <ErrorMessage name='firstname' component="span" />
                        <Field
                            as={TextField}
                            type="text"
                            name="lastname"
                            color="secondary"
                            variant="filled"
                            label="Write last name"
                            className={style.fieldForm}
                        />
                        <ErrorMessage name="lastname" component="span" />
                        <Field
                            as={TextField}
                            type="text"
                            name="nickname"
                            color="secondary"
                            variant="filled"
                            label="Write nickname"
                            className={style.fieldForm}
                        />
                        <ErrorMessage name="nickname" component="span" />
                        <Field
                            as={TextField}
                            type="email"
                            name="email"
                            color="secondary"
                            variant="filled"
                            label="Write email"
                            className={style.fieldForm}
                        />
                        <ErrorMessage name="email" component="span" />
                        <Field
                            as={TextField}
                            type="password"
                            name="password"
                            color="secondary"
                            variant="filled"
                            label="Write password"
                            autoComplete="current-password"
                            className={style.fieldForm}
                        />
                        <ErrorMessage name="password" component="span" />
                        <Button className={style.buttonForm} color="secondary" type="submit" variant="contained">
                            Submit
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}



const mapDispatchToProps = dispatch => ({
    signUpAuth: (values) => dispatch(authActionCreators.authSignUpRequest(values))
})


export default connect(null, mapDispatchToProps)(SignUp)


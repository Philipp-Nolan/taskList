import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import * as authActionCreators from '../../../actions/authCreators'
import { LOGIN_SCHEMA } from '../../../utils/validationSchemas';
import style from '../../../common/style.module.sass'
import Notification from '../../Notification'

function SignIn(props) {
    const { signInAuth, auth } = props
    function onSubmit(values, actions) {
        signInAuth(values)
        actions.setSubmitting(false);
        actions.resetForm()
    }

    return (
        <div className={style.formWrapper}>
            {/* <Notification /> */}
            <Formik
                initialValues={{
                    email: '',
                    password: '',
                }}
                validationSchema={LOGIN_SCHEMA}
                onSubmit={onSubmit}>
                {formProps => (
                    <Form className={style.formSignUp} method="post">
                        <h1 className={style.formTitle}>Sign In</h1>
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
    signInAuth: (values) => dispatch(authActionCreators.authSignInRequest(values))
})

export default connect(null, mapDispatchToProps)(SignIn)


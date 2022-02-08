import React, { useEffect, useState } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import formStyle from '../../common/style.module.sass'
import { connect } from 'react-redux';
import * as userActionCreators from '../../actions/userCreators'
import Notification from '../Notification';
import style from './style.module.sass'
import { UPDATE_SCHEMA } from '../../utils/validationSchemas';

function Profile(props) {
    const { getUser, updateUser, user: { user } } = props
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        nickname: '',
    })

    useEffect(() => {
        getUser()
        if (user.length !== 0) {
            setUserData({
                firstName: user.firstName,
                lastName: user.lastName,
                nickname: user.nickname,
            })
        }
    }, [])



    function onSubmit(values, actions) {
        setUserData({
            firstName: values.firstname,
            lastName: values.lastname,
            nickname: values.nickname,
        })
        const data = {
            firstName: values.firstname,
            lastName: values.lastname,
            nickname: values.nickname,
            password: values.password,
        }
        updateUser(data)
    }

    return (
        <div className={style.userInfoWrapper}>
            <Notification />
            <Formik
                enableReinitialize={true}
                validationSchema={UPDATE_SCHEMA}
                initialValues={{
                    firstname: userData.firstName,
                    lastname: userData.lastName,
                    nickname: userData.nickname,
                    password: '',
                }}
                onSubmit={onSubmit}>

                {formProps => (
                    <Form className={formStyle.formSignUp}>
                        <h1 className={formStyle.formTitle}>Profile settings</h1>
                        <Field
                            as={TextField}
                            type="text"
                            name="firstname"
                            variant="filled"
                            color="secondary"
                            label="Write new first name"
                            className={formStyle.fieldForm}
                        />
                        <ErrorMessage name='firstname' component="span" />
                        <Field
                            as={TextField}
                            type="text"
                            name="lastname"
                            color="secondary"
                            variant="filled"
                            label="Write new last name"
                            className={formStyle.fieldForm}
                        />
                        <ErrorMessage name='lastname' component="span" />
                        <Field
                            as={TextField}
                            type="text"
                            name="nickname"
                            color="secondary"
                            variant="filled"
                            label="Write new nickname"
                            className={formStyle.fieldForm}
                        />
                        <ErrorMessage name='nickname' component="span" />
                        <Field
                            as={TextField}
                            type="password"
                            name="password"
                            color="secondary"
                            variant="filled"
                            label="Write new password"
                            autoComplete="current-password"
                            className={formStyle.fieldForm}
                        />
                        <ErrorMessage name='password' component="span" />
                        <Button className={formStyle.buttonForm} color="secondary" type="submit" variant="contained">
                            Update
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}


const mapStateToProps = (state) => ({
    user: state.user
})

const mapDispatchToProps = dispatch => ({
    getUser: () => dispatch(userActionCreators.getUserRequest()),
    updateUser: (data) => dispatch(userActionCreators.updateUserRequest(data))
})


export default connect(mapStateToProps, mapDispatchToProps)(Profile)


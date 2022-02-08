import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { connect } from 'react-redux';
import * as authActionCreators from '../../../actions/taskCreators'
import Notification from '../../Notification'
import style from '../../../common/style.module.sass'
import { TASK_SCHEMA } from '../../../utils/validationSchemas'


function TaskForm(props) {
    const { createTask, task } = props


    function onSubmit(values, actions) {
        createTask(values)
        actions.setSubmitting(false);
        actions.resetForm()

    }
    return (
        <div className={style.formWrapper}>
            <Notification />
            <Formik
                validationSchema={TASK_SCHEMA}
                initialValues={{
                    title: '',
                    body: '',
                }}
                onSubmit={onSubmit}>
                {formProps => (
                    <Form className={style.formSignUp} method="post">
                        <h1 className={style.formTitle}>Create task</h1>
                        <Field
                            as={TextField}
                            type="text"
                            name="title"
                            color="secondary"
                            variant="outlined"
                            label="Write title"
                            className={style.fieldForm}
                        />
                        <ErrorMessage name='title' component="span" />
                        <Field
                            as={TextField}
                            type="text"
                            name="body"
                            color="secondary"
                            variant="outlined"
                            label="Write paragraph"
                            className={style.fieldForm}
                        />
                        <ErrorMessage name='body' component="span" />
                        <Button className={style.buttonForm} color="secondary" type="submit" variant="contained">
                            Create
                        </Button>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

const mapStateToProps = (state) => ({
    task: state.task
})

const mapDispatchToProps = dispatch => ({
    createTask: (values) => dispatch(authActionCreators.createTaskRequest(values))
})


export default connect(mapStateToProps, mapDispatchToProps)(TaskForm)


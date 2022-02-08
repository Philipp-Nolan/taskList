import React, { useState, useEffect } from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Link } from 'react-router-dom';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import { styled, Box } from '@mui/system';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import { connect } from 'react-redux';
import * as TaskActionCreators from '../../actions/taskCreators'
import Notification from '../Notification';
import Task from './Task'
import { TASK_SCHEMA } from '../../utils/validationSchemas'
import formStyle from '../../common/style.module.sass';
import style from './style.module.sass'

function TaskList(props) {

    const [formValues, SetFormValues] = useState({ title: '', body: '', id: null })

    const { updateTask, task: { selectTask, task }, } = props

    useEffect(() => {
        if (selectTask !== null) {
            return SetFormValues(
                {
                    id: selectTask.id,
                    title: selectTask.title,
                    body: selectTask.body,
                }
            )
        }
    }, [selectTask])


    const [someTask, setSomeTask] = useState({ title: '', body: '' })

    function onSubmit(values, actions) {
        updateTask(values, formValues.id)
    }

    const [open, setOpen] = useState(false);

    const handleOpen = (value) => {
        SetFormValues({ ...formValues, id: value, })
        setSomeTask(task.find(t => t.id === value))

        return setOpen(true)
    };

    const handleClose = () => setOpen(false);

    const StyledModal = styled(ModalUnstyled)`
    position: fixed;
    z-index: 1300;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  `;

    const Backdrop = styled('div')`
    z-index: -1;
    position: fixed;
    right: 0;
    bottom: 0;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    -webkit-tap-highlight-color: transparent;
  `;

    return (
        <div className={style.listWrapper}>
            <Notification />
            <Task handleOpen={handleOpen} />
            <StyledModal
                aria-labelledby="unstyled-modal-title"
                aria-describedby="unstyled-modal-description"
                open={open}
                onClose={handleClose}
                BackdropComponent={Backdrop}
            >
                <Box sx={style}>
                    <Formik

                        enableReinitialize
                        validationSchema={TASK_SCHEMA}
                        initialValues={{
                            title: someTask.title,
                            body: someTask.body,
                        }}
                        onSubmit={onSubmit}>
                        {formProps => (
                            <Form className={formStyle.formTask}>
                                <h1 className={formStyle.formTitle}>Edit task</h1>
                                <Field
                                    required
                                    as={TextField}
                                    type="text"
                                    name="title"
                                    color="secondary"
                                    variant="filled"
                                    label="Write title"
                                    className={formStyle.fieldForm}
                                />
                                <ErrorMessage name='title' component="span" />
                                <Field
                                    required
                                    as={TextField}
                                    type="text"
                                    name="body"
                                    color="secondary"
                                    variant="filled"
                                    label="Write paragraph"
                                    className={formStyle.fieldForm}
                                />
                                <ErrorMessage name='body' component="span" />
                                <Button className={formStyle.buttonForm} color="secondary" type="submit" variant="contained">
                                    Edit
                                </Button>
                            </Form>
                        )}
                    </Formik>
                </Box>
            </StyledModal>
            <Fab className={style.add} color="secondary" aria-label="add">
                <Link className={style.link} to="/add-task" >
                    <AddIcon />
                </Link>
            </Fab>
        </div>
    )
}

const mapStateToProps = (state) => ({
    task: state.task,
})
const mapDispatchToProps = dispatch => {
    return {
        updateTask: (data, id) => dispatch(TaskActionCreators.updateTaskRequest(data, id)),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskList)
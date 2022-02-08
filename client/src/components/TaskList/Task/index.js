import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import * as TaskActionCreators from '../../../actions/taskCreators'
import style from './style.module.sass'

function Task(props) {
    const { task: { task, error, isFatching }, getTasks, deleteTask, handleOpen } = props

    useEffect(() => {
        getTasks()
    }, [])


    const tasks = task.map(tasks => {
        return <Accordion className={style.accordion} key={tasks.id}>
            <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header">
                <Typography>{tasks.title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <Typography>
                    {tasks.body}
                </Typography>
                <Typography>
                    <Button onClick={() => handleOpen(tasks.id)} color="primary">Edit</Button>
                    <Button onClick={() => deleteTask(tasks.id)} color="error">Delete</Button>
                </Typography>
            </AccordionDetails>
        </Accordion>
    })
    return (
        <div className={style.taskWrapper}>
            <CircularProgress className={isFatching ? style.loading : style.loadingHidden} color="secondary" />
            {tasks.reverse()}
        </div>
    )
}

const mapStateToProps = (state) => ({
    task: state.task,
})
const mapDispatchToProps = dispatch => {
    return {
        getTasks: () => dispatch(TaskActionCreators.getTasksRequest()),
        deleteTask: (id) => dispatch(TaskActionCreators.deleteTaskRequest(id)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Task)
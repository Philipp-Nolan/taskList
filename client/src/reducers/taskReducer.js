import ACTION_TYPES from "../actions/actionTypes";

const initialState = {
    task: [],
    selectTask: null,
    isFatching: false,
    error: null,
    notifications: false
}

function taskReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_TASKS_REQUEST: {
            return {
                ...state,
                isFatching: true,
            }
        }
        case ACTION_TYPES.GET_TASKS_SUCCESS: {
            const { payload: { data } } = action
            return {
                ...state,
                task: [...data],
                isFatching: false,
            }
        }
        case ACTION_TYPES.GET_TASKS_ERROR: {
            const { payload: { error } } = action
            return {
                ...state,
                error: error,
                isFatching: true,
            }
        }

        case ACTION_TYPES.CREATE_TASK_REQUEST: {
            return {
                ...state,
                isFatching: true,
            }
        }
        case ACTION_TYPES.CREATE_TASK_SUCCESS: {
            const { payload: { data } } = action
            return {
                ...state,
                task: [...state.task, data.data],
                notifications: true,
                isFatching: false,
            }
        }
        case ACTION_TYPES.CREATE_TASK_ERROR: {
            const { payload: { error } } = action
            return {
                ...state,
                error: error,
                isFatching: true,
            }
        }

        case ACTION_TYPES.UPDATE_TASK_REQUEST: {
            return {
                ...state,
                isFatching: true,
            }
        }
        case ACTION_TYPES.UPDATE_TASK_SUCCESS: {
            const { payload: { data } } = action
            return {
                ...state,
                task: upd(state.task, data[0]),
                notifications: true,
                isFatching: false,
            }
        }
        case ACTION_TYPES.UPDATE_TASK_ERROR: {
            const { payload: { error } } = action
            return {
                ...state,
                error: error,
                isFatching: true,
            }
        }

        case ACTION_TYPES.DELETE_TASK_REQUEST: {
            return {
                ...state,
                isFatching: true,
            }
        }
        case ACTION_TYPES.DELETE_TASK_SUCCESS: {
            const { payload: { data } } = action
            return {
                ...state,
                notifications: true,
                task: state.task.filter(t => t.id !== parseInt(data)),
                isFatching: false,
            }
        }
        case ACTION_TYPES.DELETE_TASK_ERROR: {
            const { payload: { error } } = action
            return {
                ...state,
                error: error,
                isFatching: true,
            }
        }

        case ACTION_TYPES.NOTIFICATION: {
            return {
                ...state,
                notifications: false,
            }
        }
        default: {
            return state
        }
    }
}

export default taskReducer;


function upd(currentTask, newTask) {
    const tsk = currentTask.find(t => t.id === newTask.id)
    tsk.title = newTask.title
    tsk.body = newTask.body
    return tsk, currentTask
}



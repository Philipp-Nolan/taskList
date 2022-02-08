import ACTION_TYPES from "./actionTypes";

export const getTasksRequest = values => ({
    type: ACTION_TYPES.GET_TASKS_REQUEST, values
})
export const getTasksSuccess = data => ({
    type: ACTION_TYPES.GET_TASKS_SUCCESS,
    payload: { data }
})
export const getTasksError = error => ({
    type: ACTION_TYPES.GET_TASKS_ERROR,
    payload: { error }
})

export const createTaskRequest = data => ({
    type: ACTION_TYPES.CREATE_TASK_REQUEST,
    payload: { data }
})
export const createTaskSuccess = data => ({
    type: ACTION_TYPES.CREATE_TASK_SUCCESS,
    payload: { data }
})
export const createTaskError = error => ({
    type: ACTION_TYPES.CREATE_TASK_ERROR,
    payload: { error }
})

export const updateTaskRequest = (data, id) => ({
    type: ACTION_TYPES.UPDATE_TASK_REQUEST,
    payload: { data, id }
})
export const updateTaskSuccess = data => ({
    type: ACTION_TYPES.UPDATE_TASK_SUCCESS,
    payload: { data }
})
export const updateTaskError = error => ({
    type: ACTION_TYPES.UPDATE_TASK_ERROR,
    payload: { error }
})

export const deleteTaskRequest = data => ({
    type: ACTION_TYPES.DELETE_TASK_REQUEST,
    payload: { data }
})
export const deleteTaskSuccess = data => ({
    type: ACTION_TYPES.DELETE_TASK_SUCCESS,
    payload: { data }
})
export const deleteTaskError = error => ({
    type: ACTION_TYPES.DELETE_TASK_ERROR,
    payload: { error }
})
import { takeLatest } from 'redux-saga/effects'
import ACTION_TYPES from "../actions/actionTypes"

import {
    getTasksSaga,
    createTaskSaga,
    updateTaskSaga,
    deleteTaskSaga,
} from './taskSaga'

import {

    signUpSaga,
    signInSaga,
    logOutSaga,
    refreshSaga

} from './authSaga'

import {
    getUserSaga,
    updateUserSaga,
} from './userSaga'

function* rootSagas() {
    yield takeLatest(ACTION_TYPES.AUTH_SIGN_UP_REQUEST, signUpSaga)
    yield takeLatest(ACTION_TYPES.AUTH_SIGN_IN_REQUEST, signInSaga)
    yield takeLatest(ACTION_TYPES.AUTH_LOGOUT, logOutSaga)
    yield takeLatest(ACTION_TYPES.AUTH_REFRESH, refreshSaga)

    yield takeLatest(ACTION_TYPES.GET_USER_REQUEST, getUserSaga)
    yield takeLatest(ACTION_TYPES.UPDATE_USER_REQUEST, updateUserSaga)

    yield takeLatest(ACTION_TYPES.GET_TASKS_REQUEST, getTasksSaga)
    yield takeLatest(ACTION_TYPES.CREATE_TASK_REQUEST, createTaskSaga)
    yield takeLatest(ACTION_TYPES.UPDATE_TASK_REQUEST, updateTaskSaga)
    yield takeLatest(ACTION_TYPES.DELETE_TASK_REQUEST, deleteTaskSaga)
}
export default rootSagas
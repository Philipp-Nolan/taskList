import { put } from 'redux-saga/effects'
import * as taskActionCreators from '../actions/taskCreators'
import * as Api from '../api/taskApi'

export function* getTasksSaga() {
    try {
        const { data: { data } } = yield Api.getTasks()
        yield put(taskActionCreators.getTasksSuccess(data))
    } catch (error) {
        yield put(taskActionCreators.getTasksError(error))
    }
}

export function* createTaskSaga(actions) {
    try {
        const { payload } = actions
        const data = yield Api.createTask(payload.data)
        yield put(taskActionCreators.createTaskSuccess(data))
    } catch (error) {
        yield put(taskActionCreators.createTaskError(error))
    }
}

export function* updateTaskSaga(actions) {
    try {
        const { payload } = actions
        const { data: { data } } = yield Api.updateTask(payload.data, payload.id)
        yield put(taskActionCreators.updateTaskSuccess(data))
    } catch (error) {
        yield put(taskActionCreators.updateTaskError(error))
    }
}

export function* deleteTaskSaga(actions) {
    try {
        const { payload } = actions
        const { data: { data } } = yield Api.deleteTask(payload.data)
        yield put(taskActionCreators.deleteTaskSuccess(data))
    } catch (error) {
        yield put(taskActionCreators.deleteTaskError(error))
    }
}
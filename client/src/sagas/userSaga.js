import { put } from 'redux-saga/effects'
import * as userActionCreators from '../actions/userCreators'
import * as Api from '../api/userApi'


export function* getUserSaga() {
    try {
        const { data: { data } } = yield Api.getUser()
        yield put(userActionCreators.getUserSuccess(data[0]))
    } catch (error) {
        yield put(userActionCreators.getUserError(error.response.data.errors[0].message.message))
    }
}


export function* updateUserSaga(actions) {
    try {
        const { payload } = actions
        if (payload.data.password === '') {
            delete payload.data.password
        }
        const { data: { data } } = yield Api.updateUser(payload.data)
        yield put(userActionCreators.updateUserSuccess(data))
    } catch (error) {
        yield put(userActionCreators.updateUserError(error.response.data.errors[0].message.message))
    }
}


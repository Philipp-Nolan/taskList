import { put } from 'redux-saga/effects'
import * as authActionCreators from '../actions/authCreators'
import * as userActionCreators from '../actions/userCreators'
import * as Api from '../api/authApi'


export function* signUpSaga(action) {
    yield put(authActionCreators.authRequest())
    try {
        const { payload } = action
        const { data: { data: { user } } } = yield Api.signup(payload.data)
        yield put(userActionCreators.getUserSuccess(user))
    } catch (error) {
        yield put(authActionCreators.authError(error.response.data.errors[0].message.message))
    }
}

export function* signInSaga(action) {
    yield put(authActionCreators.authRequest())
    try {
        const { payload } = action
        const { data: { data: { user } } } = yield Api.login(payload.data)
        yield put(userActionCreators.getUserSuccess(user))
    } catch (error) {
        yield put(authActionCreators.authError(error.response.data.errors[0].message.message))
    }
}

export function* refreshSaga(action) {
    yield put(authActionCreators.authRequest())
    try {
        const { data: { data: { user } } } = yield Api.refresh(action.data)
        yield put(userActionCreators.getUserSuccess(user))
    } catch (error) {
        yield put(authActionCreators.authError(error))
    }
}

export function* logOutSaga(action) {
    yield Api.logOut()
    put(authActionCreators.authLogOut())
    put(userActionCreators.authLogOut())
}
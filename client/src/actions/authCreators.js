import ACTION_TYPES from "./actionTypes";

export const authRequest = data => ({
    type: ACTION_TYPES.AUTH_REQUEST,
    payload: { data }
})
export const authSuccess = data => ({
    type: ACTION_TYPES.AUTH_SUCCESS,
    payload: { data }
})
export const authError = error => ({
    type: ACTION_TYPES.AUTH_ERROR,
    payload: { error }
})

export const authSignInRequest = data => ({
    type: ACTION_TYPES.AUTH_SIGN_IN_REQUEST,
    payload: { data }
})

export const authSignUpRequest = data => ({
    type: ACTION_TYPES.AUTH_SIGN_UP_REQUEST,
    payload: { data }
})

export const authLogOut = () => ({
    type: ACTION_TYPES.AUTH_LOGOUT,
})

export const authRefresh = data => ({
    type: ACTION_TYPES.AUTH_REFRESH,
    data
})
import ACTION_TYPES from "./actionTypes";

export const getUserRequest = values => ({
    type: ACTION_TYPES.GET_USER_REQUEST, values
})
export const getUserSuccess = data => ({
    type: ACTION_TYPES.GET_USER_SUCCESS,
    payload: { data }
})
export const getUserError = error => ({
    type: ACTION_TYPES.GET_USER_ERROR,
    payload: { error }
})

export const updateUserRequest = (data) => ({
    type: ACTION_TYPES.UPDATE_USER_REQUEST,
    payload: { data }
})
export const updateUserSuccess = data => ({
    type: ACTION_TYPES.UPDATE_USER_SUCCESS,
    payload: { data }
})
export const updateUserError = error => ({
    type: ACTION_TYPES.UPDATE_USER_ERROR,
    payload: { error }
})


export const authLogOut = () => ({
    type: ACTION_TYPES.AUTH_LOGOUT,
})
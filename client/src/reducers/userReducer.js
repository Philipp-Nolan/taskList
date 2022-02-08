import ACTION_TYPES from "../actions/actionTypes";

const initialState = {
    user: [],
    isFatching: false,
    error: null,
    notifications: false
}

function userReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_TYPES.GET_USER_REQUEST: {
            return {
                ...state,
                isFatching: true,
            }
        }
        case ACTION_TYPES.GET_USER_SUCCESS: {
            const { payload: { data } } = action
            return {
                ...state,
                user: data,
                isFatching: false,
            }
        }
        case ACTION_TYPES.GET_USER_ERROR: {
            const { payload: { error } } = action
            return {
                ...state,
                error: error,
                isFatching: true,
            }
        }

        case ACTION_TYPES.UPDATE_USER_REQUEST: {
            return {
                ...state,
                isFatching: true,
            }
        }
        case ACTION_TYPES.UPDATE_USER_SUCCESS: {
            const { payload: { data } } = action
            return {
                ...state,
                user: data[0],
                notifications: true,
                isFatching: false,
            }
        }
        case ACTION_TYPES.UPDATE_USER_ERROR: {
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

        case ACTION_TYPES.AUTH_LOGOUT: {
            return {
                ...state,
                user: [],
                error: null
            }
        }
        default: {
            return state
        }
    }
}

export default userReducer;



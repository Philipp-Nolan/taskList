import ACTION_TYPES from "../actions/actionTypes";

const initialState = {
    isFatching: false,
    error: null,
    data: null,
}

function authReducer(state = initialState, action) {
    switch (action.type) {

        case ACTION_TYPES.AUTH_SIGN_IN_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION_TYPES.AUTH_SIGN_IN_SUCCESS: {
            const { payload: { data } } = action
            return {
                ...state,
                data: data,
                isFatching: false,
                error: null
            }
        }
        case ACTION_TYPES.AUTH_SIGN_IN_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        }

        case ACTION_TYPES.AUTH_SIGN_UP_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION_TYPES.AUTH_SIGN_UP_SUCCESS: {
            return {
                ...state,
                isFatching: false,
                error: null
            }
        }
        case ACTION_TYPES.AUTH_SIGN_UP_ERROR: {
            return {
                ...state,
                isFetching: false,
                error: action.error
            }
        }

        case ACTION_TYPES.AUTH_LOGOUT: {
            return {
                ...state,
                data: null,
                error: null
            }
        }
        case ACTION_TYPES.AUTH_REQUEST: {
            return {
                ...state,
                isFetching: true,
                error: null
            }
        }
        case ACTION_TYPES.AUTH_SUCCESS: {
            return {
                ...state,
                isFatching: false,
                error: null
            }
        }
        case ACTION_TYPES.AUTH_ERROR: {
            const { payload: { error } } = action
            return {
                ...state,
                isFetching: false,
                error: error
            }
        }
        default: {
            return state
        }
    }
}

export default authReducer;
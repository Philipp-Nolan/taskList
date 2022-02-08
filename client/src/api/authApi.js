'use strict';
import axios from 'axios'
import CONTANTS from '../constant'
let accessToken = null

const httpClient = axios.create({
    baseURL: `${CONTANTS.BASE_URL}`,
})
export default httpClient


const _url = 'auth/'


export const login = async data => {
    return await httpClient.post(`${_url}sign-in`, data)
}

export const signup = async data => {
    return await httpClient.post(`${_url}sign-up`, data)
}

export const refresh = async data => {

    return await httpClient.post(`${_url}refresh`, { refreshToken: data })
}


export const logOut = () => {
    window.localStorage.removeItem(CONTANTS.REFRESH_TOKEN)
    window.localStorage.removeItem(CONTANTS.ACCESS_TOKEN)
    accessToken = null
}

const _saveTokenPair = ({ refresh, access }) => {
    accessToken = access
    window.localStorage.setItem(CONTANTS.REFRESH_TOKEN, refresh)
    window.localStorage.setItem(CONTANTS.ACCESS_TOKEN, access)
}

const requestInterceptor = (config) => {
    const accessToken = window.localStorage.getItem(CONTANTS.ACCESS_TOKEN)
    if (accessToken) {
        config.headers = { ...config.headers, Authorization: accessToken };
    }
    return config
}

const responseInterceptor = response => {
    const {
        config: { url }
    } = response
    if (url.includes(_url)) {
        const {
            data: {
                data: { tokenPair }
            }
        } = response
        accessToken = tokenPair.access
        _saveTokenPair(tokenPair)
    }
    return response
}

const responseInterceptorError = async error => {
    const refreshToken = window.localStorage.getItem(CONTANTS.REFRESH_TOKEN)
    if (error.response.status === 419 && refreshToken) {
        const {
            data: {
                data: { tokenPair }
            }
        } = await refresh(refreshToken)
        _saveTokenPair(tokenPair)
    } else if (error.response.status === 401 && refreshToken) {
        logOut()
    }
    return Promise.reject(error)
}

httpClient.interceptors.response.use(
    responseInterceptor,
    responseInterceptorError
)

httpClient.interceptors.request.use(requestInterceptor, err =>
    Promise.reject(err)
)



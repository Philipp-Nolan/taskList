import http from './authApi'

export const getUser = () => http.get('/user')
export const updateUser = (data) => http.patch('/user', data)
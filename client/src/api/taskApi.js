import http from './authApi'

export const getTasks = () => http.get('/task')
export const deleteTask = id => http.delete(`/task/${id}`)
export const createTask = data => http.post('/task', data)
export const updateTask = (data, id) => http.patch(`/task/${id}`, data)


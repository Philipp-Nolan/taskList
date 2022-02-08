const createHttpError = require('http-errors');
const { Task } = require('../models');
const { decodeToken } = require('../services/jwtService')

module.exports.getTasks = async (req, res, next) => {
    try {
        const { headers: { authorization } } = req
        const { userId } = decodeToken(authorization)

        const tasks = await Task.findAll({
            where: { userId }
        })
        res.send({ data: tasks })
    } catch (error) {
        next(error)
    }
}

module.exports.getTask = async (req, res, next) => {
    try {
        const { headers: { authorization }, params: { id } } = req
        const { userId } = decodeToken(authorization)

        const { count: rowsCount, rows: task } = await Task.findAndCountAll({
            where: { id, userId }
        })
        if (rowsCount === 0) {
            const error = createHttpError(404, 'Task not found');
            return next(error)
        }
        res.send({ data: task })
    } catch (error) {
        next(error)
    }
}

module.exports.createTask = async (req, res, next) => {
    try {
        const { headers: { authorization }, body } = req
        const { userId } = decodeToken(authorization)
        const created = await Task.create({ ...body, userId })
        res.send(created)
    } catch (error) {
        next(error)
    }
}

module.exports.updateTask = async (req, res, next) => {
    try {
        const { body } = req
        const { headers: { authorization }, params: { id } } = req
        const { userId } = decodeToken(authorization)
        const [rowsCount, updatedTask] = await Task.update(body, {
            where: { id, userId },
            returning: true
        });
        if (rowsCount === 0) {
            const error = createHttpError(404, 'Task not found');
            return next(error)
        }
        res.send({ data: updatedTask })
    } catch (error) {
        next(error)
    }
}

module.exports.deleteTask = async (req, res, next) => {
    try {
        const { headers: { authorization }, params: { id } } = req
        const { userId } = decodeToken(authorization)

        const deleted = await Task.destroy({
            where: { id, userId },
        });
        if (deleted === 0) {
            const error = createHttpError(404, 'Task not found');
            return next(error)
        }
        res.send({ data: id })
    } catch (error) {
        next(error)
    }
}

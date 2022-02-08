const createHttpError = require('http-errors');
const { User, RefreshToken } = require('../models');
const { decodeToken } = require('../services/jwtService')

module.exports.getUser = async (req, res, next) => {
    try {
        const { headers: { authorization } } = req
        const { userId } = decodeToken(authorization)
        const { count: rowsCount, rows: user } = await User.findAndCountAll({
            where: { id: userId },
            attributes: {
                exclude: ['password']
            },
        })
        if (rowsCount === 0) {
            const error = createHttpError(404, 'User not found');
            return next(error)
        }

        console.log(user);
        res.send({ data: user })
    } catch (error) {
        next(error)
    }
}



module.exports.updateUser = async (req, res, next) => {
    try {
        const { body } = req
        const { headers: { authorization } } = req
        const { userId } = decodeToken(authorization)
        const [rowsCount, updatedUser] = await User.update(body, {
            where: { id: userId },
            returning: true,
        })
        if (rowsCount === 0) {
            const error = createHttpError(404, 'User not found');
            return next(error)
        }
        res.send({ data: updatedUser })
    } catch (error) {
        next(error)
    }
}



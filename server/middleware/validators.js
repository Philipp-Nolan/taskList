const createHttpError = require('http-errors');
const schems = require('../validationSchemes/schems');

module.exports.validateSignUp = async (req, res, next) => {
    const validationResult = await schems.signUpSchem.isValid(req.body);
    if (validationResult) {
        return next();
    }
    next(createHttpError('Invalid data for signUp'));
};


module.exports.validateSignIn = async (req, res, next) => {
    const validationResult = await schems.signInSchem.isValid(req.body);
    if (validationResult) {
        return next();
    }
    next(createHttpError('Invalid data for login'));
};

module.exports.validateTask = async (req, res, next) => {
    const validationResult = await schems.taskSchem.isValid(req.body);
    if (validationResult) {
        return next();
    }
    next(createHttpError('Invalid data for create task'));
};
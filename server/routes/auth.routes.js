const router = require('express').Router()
const AuthController = require('../controller/auth.controller')
const TokenMW = require('../middleware/token.middleware')
const validators = require('../middleware/validators');

router.post('/sign-in', validators.validateSignIn, AuthController.signIn);
router.post('/sign-up', validators.validateSignUp, AuthController.signUp);
router.post('/refresh', TokenMW.checkAccessToken, AuthController.refresh);

module.exports = router




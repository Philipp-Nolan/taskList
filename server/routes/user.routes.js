const router = require('express').Router()
const UserController = require('../controller/user.controller')
const TokenMW = require('../middleware/token.middleware')

router.use(TokenMW.checkAccessToken)

router.get('/', UserController.getUser);
router.patch('/', UserController.updateUser);

module.exports = router




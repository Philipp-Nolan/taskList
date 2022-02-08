const router = require('express').Router()
const TaskController = require('../controller/task.controller')
const TokenMW = require('../middleware/token.middleware')
const validators = require('../middleware/validators');

router.use(TokenMW.checkAccessToken)

router.get('/:id', TaskController.getTask);
router.get('/', TaskController.getTasks);
router.post('/', validators.validateTask, TaskController.createTask);
router.patch('/:id', validators.validateTask, TaskController.updateTask);
router.delete('/:id', TaskController.deleteTask)

module.exports = router




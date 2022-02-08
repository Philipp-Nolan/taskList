const router = require('express').Router()
const authRouter = require('./auth.routes')
const taskRouter = require('./task.routes')
const userRouter = require('./user.routes')

router.use('/auth', authRouter)
router.use('/task', taskRouter)
router.use('/user', userRouter)

module.exports = router;



const router = require('express').Router();
const controller = require('./user.controller')
const loginMiddleware = require('../../middlewares/auth/login')

router.use('/login',loginMiddleware)
router.post('/login',controller.login)

module.exports = router

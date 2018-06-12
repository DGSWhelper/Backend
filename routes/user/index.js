const router = require('express').Router();
const controller = require('./user.controller')
const loginMiddleware = require('../../middlewares/auth/login')

// router.get('/',loginMiddleware)
router.post('/login',controller.login)

module.exports = router

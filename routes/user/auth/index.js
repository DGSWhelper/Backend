const router = require('express').Router()
const controller = require('./user.controller')
const faceboook = require('./facebook')

router.use('/facebook', faceboook);
router.post('/facebook', controller.login);

module.exports = router
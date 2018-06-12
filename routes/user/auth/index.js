const router = require('express').Router()
const controller = require('./user.controller')
const faceboook = require('./facebook')
const verifyMiddleware = require('../../../middlewares/auth/verify')

router.get('/login', (req, res) => { res.redirect('https://www.facebook.com/v3.0/dialog/oauth?'
    + `client_id=475995082859135&redirect_uri=http://localhost:3000/user/auth/facebook&state=23#hlk{2wawew}422`
    + `scope=public_profile,email`) })
router.use('/facebook', faceboook)
router.get('/facebook', controller.login)

router.use('/order',verifyMiddleware)

router.post('/order',controller.order_enroll)
router.delete('/order',controller.order_delete)
router.get('/order/superman',controller.order_superman)
router.get('/order/customer',controller.order_customer)

router.use('/info',verifyMiddleware)
router.get('/info',controller.my_profile)
router.get('/info/:user_id',controller.other_profile)

module.exports = router

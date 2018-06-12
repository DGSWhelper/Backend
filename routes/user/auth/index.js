const router = require('express').Router()
const controller = require('./user.controller')
const faceboook = require('./facebook')

router.get('/login', (req, res) => { res.redirect('https://www.facebook.com/v3.0/dialog/oauth?'
    + `client_id=475995082859135&redirect_uri=http://localhost:3000/user/auth/facebook&state=23#hlk{2wawew}422`
    + `scope=public_profile,email`) })
router.use('/facebook', faceboook)
router.get('/facebook', controller.login)

module.exports = router

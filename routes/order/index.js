const router = require('express').Router();
const controller = require('./order.controller')
const verifyMiddleware = require('../../middlewares/auth/verify')

router.use('/',verifyMiddleware)
router.get('/',controller.notRunningOrders)
router.post('/',controller.orderApply)
router.put('/',controller.supermanSelect)
router.patch('/',controller.orderFinish)

module.exports = router

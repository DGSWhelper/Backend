const router = require('express').Router()
const user_router = require('./user')
const order_router = require('./order')
const Order = require('../models/order')
const protocol = require('../util/protocol_format').order

router.use('/user', user_router)
router.use('/order',order_router)

router.get('/admin/order',(req, res) => {
  Order.find({})
  .then((data) => {
    protocol.success(res,data)
  }).catch((err) => {
    protocol.error(res,err)
  })
});

module.exports = router

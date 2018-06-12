const User = require('../../models/user')
const Order = require('../../models/order')
const Waiting = require('../../models/waiting')
const order_protocol = require('../../util/protocol_format').order
const user_protocol = require('../../util/protocol_format').user

exports.notRunningOrders = (req,res) => {
  Order.find({"status" : 0})
  .then((data) => {
    order_protocol.success(res,data)
  }).catch((err) => {
    order_protocol.console.error(res,err);
  })
}

exports.orderApply = (req,res) => {
  user_id = req.user._id
  var waiting = new Waiting();
  waiting.order_id = req.body.order_id;
  waiting.supermain_id = user_id;
  waiting.fees = req.body.fees;
  waiting.comment = req.body.comment;

  waiting.save()
  .then(order_protocol.success(res))
  .catch((err) => {
    order_protocol.error(res,err)
  })
}

exports.supermanSelect = (req,res) => {
  user_id = req.user._id
  Order.update({$and : [{"_id" : req.body.order_id},{"customer_id" : user_id}]},{$set : {"status" : 1, "superman_id" : req.body.superman_id}})
  .then(order_protocol.success(res))
  .catch((err) => {
    order_protocol.error(res,err)
  })
}

exports.orderFinish = (req,res) => {
  Order.update({"_id" : req.body.order_id},{$set : {"status" : 2}})
  .then(order_protocol.success(res))
  .catch((err) => {
    order_protocol.error(res,err)
  })
}

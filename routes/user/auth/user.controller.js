const User = require('../../../models/user')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const protocol = require('../../../util/protocol_format').user
const moment = require('moment')

exports.login = (req, res) => {
  User.findOne({ email: req.resource.email })
    .then(data => {
      if (data === null) {
        var user = new User();
        user.email = req.resource.email;
        user.username = req.resource.name;
        user.profile_img = req.resource.picture.data.url;

        user.save((err) => {
          console.log("db_name : " + process.env.DB_NAME);
          if (err)
            protocol.error(res, err)
        })
      }
    })
    .then(() => {
      User.findOne({ email: req.resource.email })
        .then(data => {
          console.log("data : " + data);
          jwt.sign(
            {
              _id: data._id
            },
            secret,
            {
              expiresIn: "1d",
              issuer: "superman",
              subject: "userInfo"
            }, (err, token) => {
              if (err) {
                protocol.error(res, err)
              } else {
                protocol.success(res, token)
              }
            }
          )
        })
        .catch(err => {
          protocol.error(res, err)
        })
    })
    .catch(err => {
      protocol.error(res, err)
    })
}

exports.order_eroll = (req, res) => {
  var user_id = req.decoded._id
  var order = new Order();
  order.customer_id = user_id
  order.items = req.body.items
  order.registered_date = moment().format()
  order.place = req.body.place
  order.estimated_price = req.body.estimated_price

  order.save((err) => {
    if (err) order_protocol.error(res, err)
  })
  order_protocol.success(res)
}

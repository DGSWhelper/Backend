const User = require('../../../models/user')
const Order = require('../../../models/order')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET

const user_protocol = require('../../../util/protocol_format').user
const order_protocol = require('../../../util/protocol_format').order
const moment = require('moment')
var user_id = null;

exports.login = (req, res) => {

  if(req.resource.email == null){
    user_protocol.invalidate(res)
  }else {
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
              user_protocol.error(res, err)
          })
        }
      })
      .then(() => {
        User.findOne({ email: req.resource.email })
          .then(data => {
            console.log("email : "+req.resource.email);
            console.log("data : " + data);
            jwt.sign(
              {
                _id: data._id
              },
              secret,
              {
                expiresIn: "1h",
                issuer: "superman",
                subject: "userInfo"
              }, (err, token) => {
                if (err) {
                  user_protocol.error(res, err)
                } else {
                  res.cookie('x-access-token', JSON.stringify(token), {httpOnly : true})
                  user_protocol.success(res, token)
                }
              }
            )
          })
          .catch(err => {
            user_protocol.error(res, err)
          })
      })
      .catch(err => {
        user_protocol.error(res, err)
      })
  }
}

exports.logout = (req, res) => {
  res.clearCookie('x-access-token')
  user_protocol.success(res)
}

exports.order_enroll = (req, res) => {
  user_id = req.user._id
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

exports.order_superman = (req,res) => {
  user_id = req.user._id
  Order.find({"superman_id" : user_id})
  .then((data) => {
    order_protocol.success(res,data)
  }).catch((err) => {
    order_protocol.error(res,err)
  })
}

exports.order_customer = (req,res) => {
  user_id = req.user._id
  Order.find({"customer_id" : user_id})
  .then((data) => {
    order_protocol.success(res,data)
  }).catch((err) => {
    order_protocol.error(res,err)
  })
}

exports.order_delete = (req,res) => {
  user_id = req.user._id
  Order.remove({$and : [{"_id" : req.body.order_id},{"customer_id" : user_id}]},(err,output) => {
    if(err){
      order_protocol.error(res,err)
    }else{
    order_protocol.success(res)
    }
  })
}

exports.my_profile = (req,res) => {
  user_id = req.user._id
  User.findOne({"_id" : user_id})
  .then((data) => {
    user_protocol.success(res,data)
  }).catch((err) => {
    user_protocol.error(res,err)
  })
}

exports.other_profile = (req,res) => {
  User.findOne({"_id" : req.params.user_id})
  .then((data) => {
    user_protocol.success(res,data)
  }).catch((err) => {
    user_protocol.error(res,err)
  })
}

exports.like = (req,res) => {
  user_id = req.user._id
  User.findOne({"vote" : { $elemMatch : {"user_id" : user_id}}})
  .then((data) => {
    if(data != null){
      user_protocol.over(res)
    }else{
      console.log("data : "+data);
      User.findOne({"_id" : req.body.user_id})
      .then((data_tmp) => {
        console.log("data_tmp : "+data_tmp);
        User.update({"_id" : req.body.user_id},{$set : {"like" : data_tmp.like+1},$push : {"vote" : {"user_id" : user_id}}})
        .then(user_protocol.success(res))
        .catch((err) => {
          user_protocol.error(res,err)
        })
      })
      .catch((err) => {
        user_protocol.error(res,err)
      })
    }
  }).catch((err) => {
    user_protocol.error(res,err)
  })
}

exports.hate = (req,res) => {
  user_id = req.user._id
  User.findOne({"vote" : { $elemMatch : {"user_id" : user_id}}})
  .then((data) => {
    if(data != null){
      user_protocol.over(res)
    }else{
      console.log("data : "+data);
      User.findOne({"_id" : req.body.user_id})
      .then((data_tmp) => {
        User.update({"_id" : req.body.user_id},{$set : {"hate" : data_tmp.hate+1},$push : {"vote" : {"user_id" : user_id}}})
        .then(user_protocol.success(res))
        .catch((err) => {
          user_protocol.error(res,err)
        })
      })
      .catch((err) => {
        user_protocol.error(res,err)
      })
    }
  }).catch((err) => {
    user_protocol.error(res,err)
  })
}

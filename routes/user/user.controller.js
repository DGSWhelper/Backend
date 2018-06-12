const User = require('../../models/user')
const Order = require('../../models/order')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const protocol = require('../../util/protocol_format').user


exports.login = (req, res) => {
  User.findOne({email : req.facebook.email})
    .then(data => {
      if(data === null){
        var user = new User();
        user.email = req.facebook.email;
        user.username = req.facebook.name;
        user.profile_img = req.facebook.picture;

        user.save((err) => {
          console.log("db_name : "+process.env.DB_NAME);
          if(err)
            protocol.error(res,err)
        })
      }
    })
    .then(() => {
      User.findOne({email : req.facebook.email})
        .then(data => {
          console.log("data : "+data);
          jwt.sign(
            {
              _id : data._id
            },
            secret,
            {
              expiresIn: "1h",
              issuer: "superman",
              subject: "userInfo"
            }, (err,token) => {
              if(err){
                protocol.error(res,err)
              }else{
              protocol.success(res,token)
              }
            }
          )
        })
        .catch(err => {
          protocol.error(res, err)
        })
    })
    .catch(err => {
      protocol.error(res,err)
    })
}
exports.order_eroll = (req,res) => {

}

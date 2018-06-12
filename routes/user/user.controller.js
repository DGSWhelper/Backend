const User = require('../../models/user')
const jwt = require('jsonwebtoken')
const secret = process.env.JWT_SECRET
const protocol = require('../../util/protocol_format').user


exports.login = (req, res) => {
  User.findOne({email : 's060132@naver.com'})
    .then(data => {
      if(data === null){
        console.log("data : "+data);
        var user = new User();
        user.email = "s060132@naver.com";
        user.username = "박태형";
        user.profile_img = "abc.jpg";

        user.save((err) => {
          console.log("db_name : "+process.env.DB_NAME);
          if(err)
            protocol.error(res,err)
        })
      }
    })
    .then(() => {
      User.findOne({email : "s060132@naver.com"})
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

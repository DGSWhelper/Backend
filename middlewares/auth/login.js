const request = require('request')
const auth_port = process.env.AUTH_FACEBOOK_PORT
const User = require('../../models/user')

const loginMiddleware = (req, res ,next) => {

  let user_id = null;

  request(`127.0.0.1:${auth_port}`,(err,response,body) => {
      if(err){
        res.send({
          "Code" : 0,
          "Desc" : err.message
        })
      }
      req.facebook = body
  });

}

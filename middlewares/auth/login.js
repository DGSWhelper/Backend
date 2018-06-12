const request = require('request')
const config = require('../../config')
const auth_port = process.env.AUTH_FACEBOOK_PORT
const User = require('../../models/user')

const url = 'http://localhost:'+auth_port

const loginMiddleware = (req, res ,next) => {
  console.log("url : "+url);
  request(url,(err,response,body) => {
      if(err){
        res.send({
          "Code" : 0,
          "Desc" : err.message
        })
      }
      req.facebook = body
      next()
  });
}

module.exports = loginMiddleware

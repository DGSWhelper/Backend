const request = require('request')
const config = require('../../config')
const auth_port = process.env.AUTH_FACEBOOK_PORT
const User = require('../../models/user')

const url = 'http://localhost:'+auth_port

const loginMiddleware = (req, res ,next) => {
  console.log("url : "+url);
  res.redirect('/access');
}

module.exports = loginMiddleware

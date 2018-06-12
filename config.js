require('dotenv').config()
module.exports = {
  "DB_PORT" : process.env.DB_PORT,
  "AUTH_FACEBOOK_PORT" : process.env.AUTH_FACEBOOK_PORT,
  "SERVER_PORT" : process.env.SERVER_PORT,
  "JWT_SECRET" : process.env.JWT_SECRET,
  "DB_NAME" : process.env.DB_NAME
}

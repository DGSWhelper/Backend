const bodyParser = require('body-parser')
const express = require('express')
require('dotenv').config()
const port = process.env.SERVER_PORT
const app = express()

const server = app.listen(port, () => {
  console.log(`Express Server is Running on ${port}`)
})

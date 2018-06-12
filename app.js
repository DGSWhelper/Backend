const bodyParser = require('body-parser')
const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const db_name = process.env.DB_NAME
const port = process.env.SERVER_PORT
const app = express()
const router = require('./routes')

app.use(bodyParser.urlencoded({extended : true}))
app.use(bodyParser.json())

app.use('/',router)

const server = app.listen(port, () => {
  console.log(`Express Server is Running on ${port}`)
})

//connect to mongodb server
mongoose.connect(`mongodb://localhost/${db_name}`)
const db = mongoose.connection
db.on('error', console.error)
db.once('open', () => {
  console.log('connected to mongodb server')
})

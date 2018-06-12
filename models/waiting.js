const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Waiting = new Schema({
  order_id: String,
  superman_id: String,
  fees: Number,
  comment: String
});

module.exports = mongoose.model('Waiting',Waiting);

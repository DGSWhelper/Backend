const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  email : String,
  username: String,
  contact: String,
  finish_order: Number,
  profile_img: String,
  vote: [String],
  like: {type: Number, default: 0},
  hate: {type: Number, default: 0}
});

module.exports = mongoose.model('User',User);

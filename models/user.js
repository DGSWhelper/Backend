const mongoose = require('mongoose')
const Schema = mongoose.Schema

const User = new Schema({
  email : String,
  username: String,
  contact: String,
  finish_order: {type : Number, default: 0},
  profile_img: String,
  vote: [new mongoose.Schema({user_id: String})],
  like: {type: Number, default: 0},
  hate: {type: Number, default: 0}
});

module.exports = mongoose.model('User',User);

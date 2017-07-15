const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Market = new Schema({
  username: String,
  password: String,
  postedCards: []
})

module.exports = mongoose.model('Market', Market)

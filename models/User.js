const mongoose = require('mongoose')
const Schema = mongoose.Schema
const passportLocalMongoose = require('passport-local-mongoose')

const User = new Schema({
  name: String,
  username: String,
  password: String,
  favorites: [],
  ownCards: []
})

User.plugin(passportLocalMongoose)

module.exports = mongoose.model('User', User)

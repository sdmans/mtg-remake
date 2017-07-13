const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/User.js')

const userRouter = express.Router()

userRouter.get('/register', function(req, res) {
  res.render('user/register')
}).post('/register', function( req, res) {
  User.register(new User({
    name: req.body.realname,
    username: req.body.username
  }), req.body.password, function (err, user) {
    if (err) {
      return res.render('user/register', {user: user})
    }
    passport.authenticate('local')(req, res, function() {
      console.log(user)
      res.redirect('/')
    })
  })

})


userRouter.get('/signin', function(req, res) {
  res.render('user/signin')
}).post('/signin',
passport.authenticate('local'),
function(req, res) {
  console.log('login successful')
  let userObject = req.user
  console.log(userObject)
  res.redirect('/')
})


module.exports = userRouter

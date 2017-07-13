const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/User.js')

const userRouter = express.Router()

userRouter.get('/register', function(req, res) {
  res.render('user/register')
})

userRouter.get('/signup', function(req, res) {
  res.render('user/signup')
})


module.exports = userRouter

const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/User.js')

const userRouter = express.Router()

//Rendering the register page
//Getting the page to store a username and password after being submitted
userRouter.get('/register', function(req, res) {
  res.render('user/register')
}).post('/register', function( req, res) {
  User.register(new User({
    username: req.body.username
  }), req.body.password, function (err, user) {
    if (err) {
      console.log('error occurred')
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
  // let userObject = req.body.username
  // console.log(req.user)
  res.redirect('/user/profile')
})

userRouter.get('/profile', function(req, res) {
  const currentUser = req.user
  // console.log(currentUser)
  res.render('user/user', {currentUser} )
}).post('/profile', function(req, res) {
  const currentUser = req.user
  const inventory = req.user.ownCards
  const removeCardValue = req.body.removedCard
  console.log(inventory)

  for(i = 0; i<inventory.length; i++) {

    if(inventory[i].uniqueId === removeCardValue) {

      console.log(inventory[i].name + ` found at position ${i}`)
      console.log('removing from Array...')

      inventory.splice(i, 1)
      console.log(inventory)
      currentUser.save()
      res.redirect('/user/profile')
    } else {
        console.log('card not found')
    }
  }

})


/* Code to Log Out of Profile */
// .post('/profile', function (req, res) {
//   req.logout()
//   res.redirect('/')
// })

// userRouter.get('logout', function(req, res) {
//   req.logout()
//   res.redirect('/')
// })


module.exports = userRouter

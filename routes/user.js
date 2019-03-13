const express = require('express')
const mongoose = require('mongoose')
const passport = require('passport')
const User = require('../models/User.js')
const Market = require('../models/Market')

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
      // console.log(user)
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
  const removedCardValue = req.body.removedCard
  // console.log(inventory)

  for(i = 0; i<inventory.length; i++) {

    if(inventory[i].uniqueId === removedCardValue) {
      // console.log(inventory[i].name + ` found at position ${i}`)
      // console.log('removing from Array...')
      // console.log(inventory[i]);

      let marketQuery = {__v: 1};
      Market.findOne(marketQuery, 'postedCards', function(err, market) {
        if (err) {
          console.error(err);
          return;
        } else {
          let postedCards = market.postedCards;

          postedCards.map((card, index) => {
            if (card.uniqueId === removedCardValue) {
              console.log("Removing the following card from market: ", card);
              postedCards.splice(index, 1);
              market.save();
            } else {
              return;
            }
          });
        }
      });
      console.log('removing card from inventory: ', inventory[i]);
      inventory.splice(i, 1);

      // console.log(inventory)
      currentUser.save();
      /* Find a way to remove the card if it's posted on the market as well */
      res.redirect('/user/profile');
    } else {
        console.log('card not found');
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

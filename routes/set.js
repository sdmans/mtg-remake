const express = require('express')
const mtg = require('mtgsdk')

const setRouter = express.Router()

setRouter.get('/set', function (req, res ) {

  mtg.card.where({set:'soi', types: 'Creature'})
  .then(function(cards) {
    console.log(cards.length)
    res.render('sets/set', {cards})
  })

  // res.render('sets/set', {})
})

module.exports = setRouter

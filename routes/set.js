const express = require('express')
const mtg = require('mtgsdk')

const setRouter = express.Router()

setRouter.get('/akh', function (req, res ) {
  let setTitle = 'Amonkhet'

  mtg.card.where({set:'akh'})
  .then(function(cards) {
    res.render('sets/set', {cards, setTitle})
  })

})

setRouter.get('/aer', function (req, res ) {
  let setTitle = 'Aether Revolt'
  mtg.card.where({set:'aer'})
  .then(function(cards) {
    res.render('sets/set', {cards, setTitle})
  })

})

setRouter.get('/kld', function (req, res ) {
let setTitle = 'Kaladesh'
  mtg.card.where({set:'kld'})
  .then(function(cards) {
    res.render('sets/set', {cards, setTitle})
  })

})

setRouter.get('/emn', function (req, res ) {
  let setTitle = 'Eldritch Moon'
  mtg.card.where({set:'emn'})
  .then(function(cards) {
    res.render('sets/set', {cards, setTitle})
  })

})

setRouter.get('/soi', function (req, res ) {
  let setTitle = 'Shadows Over Innistrad'
  mtg.card.where({set:'soi'})
  .then(function(cards) {
    res.render('sets/set', {cards, setTitle})
  })

})



module.exports = setRouter

const express = require('express')
const marketRouter = express.Router()

//Requiring Market Schema
const Market = require('../models/Market.js')

//Need to get the current market to exist before I start submitting information to it

marketRouter.get('/market', function (req, res) {

  res.render('market/market', {name: ['Archangel Avacyn', 'Cull the Meek', 'Liliana the last Hope']})
})

marketRouter.get('/submit', function(req, res) {
  let submittingUser = req.user
  res.render('market/cardsubmit', {submittingUser})
})

// .post('/submit', function(req, res) {
//   console.log()
//
// })

module.exports = marketRouter

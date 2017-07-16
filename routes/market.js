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
}).post('/submit', function(req, res) {
  let submittingUser = req.user
  let cardValue = req.body.inventoryselector
  console.log(cardValue)
  currentCards = submittingUser.ownCards

//Query the card based on uniqueId

for(i = 0; i<currentCards.length; i++) {
  if(currentCards[i].uniqueId === cardValue) {
    console.log(currentCards[i].name + ` found at position ${i}`)
    console.log('The ID is ' + `${currentCards[i].uniqueId}`)

  } else {
    console.log('continuing loop')
  }
}

//

//code to remove cards

  // for(i = 0; i<currentCards.length; i++) {
  //   if(currentCards[i].name === cardValue) {
  //     console.log(currentCards[i].name + ` found at position ${i}`)
  //     console.log('removing from Array...')
  //     currentCards.splice(i, 1)
  //     console.log(currentCards)
  //     submittingUser.save()
  //   } else {
  //     console.log('continuing loop')
  //   }
  // }

//remove cards function ends here

})

module.exports = marketRouter

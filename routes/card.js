const express = require('express')
const mtg = require('mtgsdk')

const cardRouter = express.Router()

//Testing Search function
//Figure out how to handle blank entries
cardRouter.get('/search', function (req, res) {
  res.render('cards/search')
}).post('/search', function(req, res) {
  //Store set to a variable
  let cardSet = req.body.selectset
  //store type to a variable
  let cardType = req.body.selecttype

  mtg.card.where({set: cardSet, type: cardType})
  .then(function(cards) {

    //Rerender the page
    res.render('cards/search', {cards})
    //Attempt to store cardname value to a variable
    /*Can't seem to use this to redirect to pages
    //'Can\'t set headers after they are sent.'
    // res.redirect(`/cards/${cardName}`)*/
  })

  })


//Search by Name
//To be Adjusted
/*This throws errors if multiples of the card exists*/

cardRouter.get('/:name', function(req, res) {
  const cardName = req.params.name
  console.log(req.params.name)
  const singleCard = {
    name: '',
      type: '',
      colors: '',
      text: '',
      image: '',
      rarity: '',
      set: ''
  }
  console.log(cardName)

  mtg.card.all({name: cardName})
  .on('data', function(card) {
    // console.log(card)
    console.log(card.name)
    //Stores the card to a variable
    //Need to find a way to query the card through a form setting both name and set
      singleCard.name = card.name
      singleCard.type = card.type
      singleCard.colors = card.colors
      singleCard.text = card.text
      singleCard.image = card.imageUrl
      singleCard.rarity = card.rarity
      singleCard.set = card.setName
      console.log(singleCard)

    res.render('cards/card', singleCard)
  })

})

module.exports = cardRouter

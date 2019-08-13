const express = require('express')
const mtg = require('mtgsdk')

const cardRouter = express.Router()

//This handles the Card Search View for the application
cardRouter.get('/search', function(req, res) {
  console.log('Accessing card search...')
  res.render('cards/search')
}).post('/search', function(req, res) {
  //Store set to a variable
  let cardSet = req.body.selectSet
  //store type to a variable
  let cardType = req.body.selectType
  /* Figure out how to handle blank entries */

  mtg.card.where({
      set: cardSet,
      type: cardType
    })
    .then(function(cards) {
      // console.log(cardSet)

      //Rerender the page
      res.redirect(`/cards/namesearch/${cardSet}/${cardType}`)
    })
});

cardRouter.get('/namesearch/:set/:type', function(req, res) {
  //Take the two parameters and use them to query for the list
  const parameters = req.params
  const set = req.params.set
  const type = req.params.type

  //search based on these parameters
  mtg.card.where({
      set: set,
      type: type
    })
    .then(function(cards){
      //render the queried cards
      res.render('cards/namesearch', {cards, parameters})
    })

}).post('/namesearch/:set/:type', function(req, res) {
  const location = req.body.nameSelector
  // console.log(location)
  res.redirect(`/cards/${location}`)
});

//Search by multiverseid
cardRouter.get('/:multiverseid', function(req, res) {
  const cardID = req.params.multiverseid

  mtg.card.find(cardID)
    .then(result => {
      const currentCard = {
        name: result.card.name,
        type: result.card.type,
        colors: result.card.colors,
        text: result.card.text,
        image: result.card.imageUrl,
        rarity: result.card.rarity,
        set: result.card.setName,
        id: result.card.multiverseid
      }
      res.render('cards/multiverseid', currentCard)
    })
}).post('/:multiverseid', function(req, res){
  const id = req.params.multiverseid
  const currentUser = req.user

  mtg.card.find(id)
    .then(result => {
      console.log(`now logging result ${this}`);
      const chosenCard = {
        name: result.card.name,
        type: result.card.type,
        colors: result.card.colors,
        text: result.card.text,
        image: result.card.imageUrl,
        rarity: result.card.rarity,
        set: result.card.setName,
        id: result.card.multiverseid,
        uniqueId: `${result.card.name}` + ` ${currentUser.ownCards.length}`,
        onMarket: false
      }


      // const currentUser = req.user
      console.log(currentUser.ownCards)
      currentUser.ownCards.push(chosenCard)
      console.log(currentUser.ownCards)

      let currentCards = currentUser.ownCards



      currentUser.save()

      res.redirect('/user/profile')
    })

})


//Search by Name
//To be Adjusted
/*This throws errors if multiples of the card exists*/

//Commenting out this entire route since it won't work
/*
cardRouter.get('/:name', function(req, res) {
  const cardName = req.params.name
  // console.log(req.params.name)
  const singleCard = {
    name: '',
    type: '',
    colors: '',
    text: '',
    image: '',
    rarity: '',
    set: ''
  }
  // console.log(cardName)

  mtg.card.all({
      name: cardName
    })
    .on('data', function(card) {
      // console.log(card)
      // console.log(card.name)
      //Stores the card to a variable
      //Need to find a way to query the card through a form setting both name and set

      singleCard.name = card.name
      singleCard.type = card.type
      singleCard.colors = card.colors
      singleCard.text = card.text
      singleCard.image = card.imageUrl
      singleCard.rarity = card.rarity
      singleCard.set = card.setName
      // console.log(singleCard)

      res.render('cards/card', singleCard)
    })

}).post('/:name', function(req, res) {

  console.log(req.params.name)

  mtg.card.all({
      name: req.params.name
    })
    .on('data', function(card) {
      // console.log(card)
      // console.log(card.name)
      //Stores the card to a variable
      //Need to find a way to query the card through a form setting both name and set

      const chosenCard = {
        name: card.name,
        type: card.type,
        colors: card.colors,
        text: card.text,
        image: card.imageUrl,
        rarity: card.rarity,
        set: card.setName
      }
      const currentUser = req.user
      currentUser.owncards.push(chosenCard)

      console.log(chosenCard)
      console.log(req.user)

      console.log( `/cards/${ card.name }` )
      res.redirect(`/cards/${ card.name }`)
    })
  // res.render('cards/card', {})
})

*/

module.exports = cardRouter

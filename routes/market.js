const express = require('express');
const marketRouter = express.Router();
const mongoose = require('mongoose');
const User = require('../models/User.js');

//Requiring Market Schema
const Market = require('../models/Market.js')

//Create currentMarket Object using Schema
// const currentMarket = new Market()

//Need to get the current market to exist before I start submitting information to it
marketRouter.get('/market', function (req, res) {
  let currentUser = req.user;

  if (currentUser) {
    console.log("Currently signed in as ", currentUser.username);
  } else {
    console.log('Viewing market but not currently signed in');
  }

  // if(submittingUser != undefined){
    /* Created an empty array to add card market collection on mongodb database https://stackoverflow.com/questions/5794834/how-to-access-a-preexisting-collection-with-mongoose */
      let currentCardsOnMarket = [];
      mongoose.connection.db.collection('markets', function(err, collection) {
        if (err) {
          //console log the error, this may be used later once I start testing for problems.
          console.err("An error occurred", err);
        } else {
        collection.find('postedCards').toArray(function (err, docs) {
          if (err) {
            //console log the error, this may be used later once I start testing for problems.
            console.log("An error occurred", err);
          } else {
            currentCardsOnMarket = docs[0].postedCards;
            // console.log(currentCardsOnMarket);
            res.render('market/market', {currentCardsOnMarket, currentUser});
          }
        });
      } 
      });
}).post('/market', function(req, res) {
  /* Store and check for currentUser */
  let currentUser = req.user;
  if(currentUser) {
  console.log(currentUser.ownCards);
  }
  
});


/*
.post('/market', function(req, res) {
  console.log('post request is ', req);
  // const submittingUser = req.user
  const removedCardId =  req.body.marketSelector
  const marketCards = currentMarket.postedCards

  // console.log('removed card id is ' + removedCardId)

  for(i = 0; i < marketCards.length; i++){
    if(marketCards[i].uniqueId === removedCardId) {
      marketCards.splice(i, 1)
      console.log('card removed')
      console.log(marketCards)
      res.redirect('/trade/market')
    }
  }

})

/* 2/25/19 Note: Code below controls the cardSubmit view available when you choose to submit a card to the market */
/* Personal note. Need to update the post remove functionality so that only the proper users can remove their cards when signed in */
 marketRouter.get('/submit', function(req, res) {
  let submittingUser = req.user
  res.render('market/cardsubmit', {submittingUser})
}).post('/submit', function(req, res) {
  let submittingUser = req.user;
  /* cardValue takes the uniqueId value from the selector which is also present in the req.user.ownCards array card objects */
  let selectedCardValue = req.body.inventoryselector;
  // console.log(req.body);
  let userCards = submittingUser.ownCards;//Stores user's own cards to a variable.
  // console.log("User's cards are ", userCards);


  /* Need to find a way to add the card to market, then toggle whether the card has been posted or not in it's user collection. 
  This would been toggling and saving in the post. Then navigate to the market. 
  */
    console.log(submittingUser._id);
    let userId = submittingUser._id;
    
    // console.log(submittingUser.ownCards);
    // console.log(`Card found at ${index}:`, card);

      
      submittingUser.ownCards.forEach(function(card) {
        let uniqueCardId = card.uniqueId;
        if(uniqueCardId === selectedCardValue) {
          card.onMarket = !card.onMarket
          // submittedCard.onMarket = !submittedCard.onMarket;
          let updatedCollection = submittingUser.ownCards;
          console.log(updatedCollection[0]);

          let query = {_id: userId};

          mongoose.connection.db.collection('users', function (err, collection) {
            if (err) {
              console.error(err);
            } else {
              /* Used this stackoverflow to solve the saving issue. Should implement this solution to the market too! https://stackoverflow.com/questions/38883285/error-the-update-operation-document-must-contain-atomic-operators-when-running/38883596 
              Here's a link to the documentation that explains the $set update operator https://docs.mongodb.com/manual/reference/method/db.collection.findOneAndUpdate/ and an explanation of the update operators*/
              collection.findOneAndUpdate(query, {$set: {"ownCards": updatedCollection}}, {upsert: false}, function(err) {
                if (err){
                  console.error(err);
                } else {
                  /* Push new card to the market */
                  mongoose.connection.db.collection('markets', function (err, collection) {
                    if (err) {
                      console.error(err);
                    } else {
                      let currentMarket = collection.find()
                    }
                  })
                  res.redirect('/user/profile');
                }
              });
            }
          })

        } else {
          return;
        }
      });
});
/*
//Query the card based on uniqueId
for(i = 0; i < currentCards.length; i++) {
  if(currentCards[i].uniqueId === cardValue) {

    //Card pushed to current market
    let marketCards = currentMarket.postedCards

    currentCards[i].onMarket = true
    currentCards[i].owner = submittingUser.username

    marketCards.push(currentCards[i])
    console.log(marketCards);
    
    // currentCards.splice[i, 1]
    // console.log('saving...')
    // submittingUser.save()
    console.log("Current Market is ", currentMarket);
    currentMarket.save();

    //Card removed from user's own cards

    res.redirect('/trade/market')

  } else {
    console.log('card not found after loop')
    console.log(currentMarket)
  }
}

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
*/

module.exports = marketRouter

const express = require('express');
const marketRouter = express.Router();
const mongoose = require('mongoose');

//Requiring User Market Schema
const User = require('../models/User.js');
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
  let selectedCardId = req.body.marketSelector;
  let marketQuery = {__v: 1};

  Market.findOne(marketQuery, 'postedCards', function(err, market) {
    if (err) {
      console.error(err);
      return;
    } else {
      let cardsOnMarket = market.postedCards;
      cardsOnMarket.map((marketCard, index) => {
        if (marketCard.uniqueId === selectedCardId) {
          // console.log(index, marketCard);
          /* Remove card from the market array, then toggle it in the user's inventory*/
          cardsOnMarket.splice(index,1);//Deletes the card based on the index from the map method
          // console.log(cardsOnMarket);
          market.save();//saving the market once the card is removed from the array

          /* Find the card in the user's inventory to change the onMarket flag after it's taken town */
          let userQuery = {username: marketCard.owner};//Query based on username

          User.findOne(userQuery, 'ownCards', function(err, user) {
            if (err) {
              console.error(err);
            } else {
              user.ownCards.map((userCard, index) => {
                // console.log(userCard.uniqueId);
                if(userCard.uniqueId === marketCard.uniqueId) {
                  // console.log('Card matches', index, userCard);
                  userCard.onMarket = false;//toggling the card back to false once it's removed from the market
                  let updatedCollection = user.ownCards;//Stores updated user's cards to variable for update saving
                  User.findOneAndUpdate(userQuery, {$set: {"ownCards": updatedCollection}}, {upsert: false}, (currentUser, err) => {
                    if (err) {
                      console.error(err);
                    } else {
                      
                      currentUser.save();//saving user with updated inventory
                      return console.log("Saving updated user's inventory");
                    }
                  });
                  console.log("Redirecting...");
                  res.redirect('/trade/market');
                } else {
                  return console.log('Card not found')//Returns if no card is found;
                }
              });
            }
          });
          
          return;
        } else {
          return;
        }
      })
  }
});
  // console.log(cardsOnMarket);
  // console.log(req.body.marketSelector);
  // cardsOnMarket.map((card, index) =>{
  //   console.log(index, card);
  // })

  let currentUser = req.user;
  if(currentUser) {
  console.log(currentUser.ownCards);
  return;
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
        let submittedCard = card;
        let uniqueCardId = card.uniqueId;
        if(uniqueCardId === selectedCardValue) {
          if(card.onMarket === false) {
          card.onMarket = true;
          // submittedCard.onMarket = !submittedCard.onMarket;
          let updatedCollection = submittingUser.ownCards;
          // console.log(updatedCollection[0]);

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
                  let marketQuery = {__v: 1};
                  /* Documentation for the findOne() mongoose method https://mongoosejs.com/docs/api.html#model_Model.findOne */
                  Market.findOne(marketQuery, 'postedCards', function(err, market) {
                    if (err) {
                      console.error(err);
                    } else {
                    console.log(market);
                      let currentMarket = market.postedCards;
                      /* If statement checks to see if the card is currently onMarket  and will return a message if*/
                          if(submittedCard.onMarket === true) {
                            submittedCard.owner = submittingUser.username;
                            // console.log(submittingUser, submittedCard)
                            console.log(submittedCard);
                            currentMarket.push(submittedCard);
                            console.log("Current market has ", currentMarket);
                            market.save();
                            return;
                        } else {
                          return console.log('Card could not be submitted. Has it already been posted?');
                        }
                      }
                  });
                 
                  /*
                  mongoose.connection.db.collection('markets', function (err, collection) {
                    if (err) {
                      console.error(err);
                    } else {
                      collection.find('owncards').toArray(function (err, docs) {
                        if (err) {
                          //console log the error, this may be used later once I start testing for problems.
                          console.log("An error occurred", err);
                        } else {
                          let currentMarket = docs[0].postedCards;
                          console.log("The current market is ", currentMarket);
                          // console.log(submittedCard);
                            if (submittedCard.onMarket === true) {
                              submittedCard.owner = submittingUser.username;
                              // console.log(submittingUser, submittedCard)
                              console.log(submittedCard);
                              currentMarket.push(submittedCard);
                              console.log("Current market has ", currentMarket);
                              // docs.save();
                            } else {
                              return console.log('Card could not be added to the market, has it already been posted?', submittedCard.onMarket);
                            }
                          
                        }
                      });
                    }
                  }) */
                  res.redirect('/user/profile');
                }
              });
            }
          })
        } else {
          console.log('It looks like there was a problem, has this card has already been posted?', card.onMarket);
          return res.redirect('/user/profile');
        }
      } else {
          /* Returns if card uniqueID's don't match */
          return console.log(`${card.name} doesn't match selected card`);
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

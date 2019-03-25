//This will control the functionality of the index page

/* Code to retreive cards
setCodes:
Amonkhet: akh
Aether Revolt: aer
Kaladesh: kld
Eldritch Moon: emn
Shadows Over Innistrad: soi
*/

const express = require('express')
const appRouter = express.Router()

appRouter.get('/', function( req, res) {
  const currentUser = req.user
  res.render('index', {currentUser});//Gives template access to the currentUser Object
}).post('/', function(req, res) {
    req.logout()
    res.redirect('/')
})

module.exports = appRouter

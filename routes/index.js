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
  const activeUser = req.user
  res.render('index', {activeUser})
}).post('/', function(req, res) {
    req.logout()
    res.redirect('/')
})

module.exports = appRouter

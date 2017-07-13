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
  res.render('index', {})
})

module.exports = appRouter

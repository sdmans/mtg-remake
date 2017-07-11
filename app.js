//Required Tools
const express  = require('express')
const mtg = require('mtgsdk')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')

//Initiating application and require routes
const app = express()
const appController = require('./routes/index.js')
const setController = require('./routes/set.js')

//Setting handlebars stuff
app.engine('handlebars', hbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Making use of routes
app.use('/', appController)
app.use('/sets', setController)

//Server Connect for both port and Heroku
let port = process.env.PORT || 3000
app.listen(port, function() {
  console.log('listening in on port 3000')
})

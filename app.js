//Required Tools
const express  = require('express')
const mtg = require('mtgsdk')
const bodyParser = require('body-parser')
const hbs = require('express-handlebars')
const mongoose = require('mongoose')

//Requiring Passport
const cookieParser = require('cookie-parser')
const expressSession = require('express-session')
const passport = require('passport')
const localStrategy = require('passport-local').Strategy

//Connecting to Database
// mongoose.connect('mongodb://smans:dec122188@cluster0-shard-00-00-9pk1p.mongodb.net:27017,cluster0-shard-00-01-9pk1p.mongodb.net:27017,cluster0-shard-00-02-9pk1p.mongodb.net:27017/Cluster0?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin')

//Initiating application and require routes
const app = express()

app.use(bodyParser.urlencoded({extended: true}))

const appController = require('./routes/index.js')
const setController = require('./routes/set.js')
const cardController = require('./routes/card.js')
const marketController = require('./routes/market.js')
const userController = require('./routes/user.js')

//Setting handlebars stuff
app.engine('handlebars', hbs({defaultLayout: 'main'}))
app.set('view engine', 'handlebars')

//Making use of routes
app.use('/', appController)
app.use('/sets', setController)
app.use('/cards', cardController)
app.use('/trade', marketController)
app.use('/user', userController)

//Requiring User model
const User = require('./models/User')

//Authentication
// app.use(expressSession({secret: 'mySecretKey'}))
// app.use(passport.initialize())
// app.use(passport.session())
//
// passport.use(new localStrategy(User.authenticate()))
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser())


//Server Connect for both port and Heroku
let port = process.env.PORT || 3000
app.listen(port, function() {
  console.log('listening in on port 3000')
})

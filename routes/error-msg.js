const express = require('express')
const appRouter = express.Router()

appRouter.get('*', function( req, res ) {
//   const currentUser = req.user
  res.redirect('/');//Takes any unrecognized route and takes the user back to the main index page.
})

module.exports = appRouter
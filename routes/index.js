const express = require('express')
const appController = express.Router()

appController.get('/', function( req, res) {
  res.render('index', {})
})

module.exports = appController

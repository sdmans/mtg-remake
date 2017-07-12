const express = require('express')
const marketController = express.Router()

marketController.get('/market', function (req, res) {
  res.render('market/market', {name: ['Archangel Avacyn', 'Cull the Meek', 'Liliana the last Hope']})
})

module.exports = marketController

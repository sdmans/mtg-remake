const express = require('express')
const marketRouter = express.Router()

marketRouter.get('/market', function (req, res) {
  res.render('market/market', {name: ['Archangel Avacyn', 'Cull the Meek', 'Liliana the last Hope']})
})

module.exports = marketRouter

module.exports = function(app) {

  var express = require('express')

  var Orders = require('../controllers/c_orders')(app)
  var util = require('../util')


  var router = express.Router()

  router.get('/:id', util.isAuthenticated, Orders.getById)
  router.post('/', util.isAuthenticated, Orders.create)

  return router
}
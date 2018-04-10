module.exports = function(app) {

    var express = require('express')

    var Colors = require('../controllers/c_colors')(app)
    var util = require('../util')

    // Mounted on /api/orders
    var router = express.Router();

    router.get('/:id', util.isAuthenticated, Colors.getById);
    router.put('/:id', util.isAuthenticated, Colors.edit);
    router.delete('/:id', util.isAuthenticated, Colors.esborrar);
    router.get('/', util.isAuthenticated, Colors.getAll);
    router.post('/', util.isAuthenticated, Colors.create);

    return router
}
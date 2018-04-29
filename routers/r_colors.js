module.exports = function(app) {

    var express = require('express')

    var Colors = require('../controllers/c_colors')(app)
    var util = require('../util')

    
    var router = express.Router();

    router.get('/:id', util.isAuthenticated, Colors.getById);
    router.put('/:id', util.isAdmin, Colors.edit);
    router.delete('/:id', util.isAdmin, Colors.esborrar);
    router.get('/', util.isAuthenticated, Colors.getAll);
    router.post('/', util.isAdmin, Colors.create);

    return router
}
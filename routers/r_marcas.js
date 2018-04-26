module.exports = function(app) {

    var express = require('express');

    var Marcas = require('../controllers/c_marcas')(app);
    var util = require('../util');

    
    var router = express.Router();

    router.get('/:id', util.isAuthenticated, Marcas.getById);
    router.put('/:id', util.isAdmin, Marcas.edit);
    router.delete('/:id', util.isAdmin, Marcas.esborrar);
    router.get('/', util.isAuthenticated, Marcas.getAll);
    router.post('/', util.isAdmin, Marcas.create);

    return router
}
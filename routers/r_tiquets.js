module.exports = function(app) {

    var express = require('express')

    var Tiquet = require('../controllers/c_tiquets')(app)
    var util = require('../util')


    var router = express.Router();

    router.get('/:params', util.isAuthenticated, Tiquet.getById);
    router.put('/:id', util.isAuthenticated, Tiquet.edit);
    router.delete('/:id', util.isAuthenticated, Tiquet.esborrar);
    router.get('/', util.isAuthenticated, Tiquet.getAll);
    router.post('/', util.isAuthenticated, Tiquet.create);

    return router
}
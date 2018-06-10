module.exports = function(app) {

    var express = require('express')

    var Tiquet = require('../controllers/c_tiquets')(app)
    var util = require('../util')

    var router = express.Router();

    router.get('/:params', util.isAdmin, Tiquet.getById);
    router.put('/:id', util.isAdmin, Tiquet.edit);
    router.delete('/:id', util.isAdmin, Tiquet.esborrar);
    router.get('/', util.isAdmin, Tiquet.getAll);
    router.post('/', util.isAuthenticated, Tiquet.create);

    return router
}
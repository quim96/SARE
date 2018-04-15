module.exports = function(app) {

    var express = require('express')

    var Arees = require('../controllers/c_arees')(app)
    var util = require('../util')


    var router = express.Router();

    router.get('/:id', util.isAuthenticated, Arees.getById);
    router.put('/:id', util.isAuthenticated, Arees.edit);
    router.delete('/:id', util.isAuthenticated, Arees.esborrar);
    router.get('/', util.isAuthenticated, Arees.getAll);
    router.post('/', util.isAuthenticated, Arees.create);

    return router
}
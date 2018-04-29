module.exports = function(app) {

    var express = require('express')

    var Vehicles = require('../controllers/c_vehicles')(app)
    var util = require('../util')

    
    var router = express.Router();

    router.get('/:id', util.isAuthenticated, Vehicles.getById);
    router.put('/:id', util.isAuthenticated, Vehicles.edit);
    router.delete('/:id', util.isAuthenticated, Vehicles.esborrar);
    router.get('/', util.isAuthenticated, Vehicles.getAll);
    router.post('/', util.isAuthenticated, Vehicles.create);

    return router
}
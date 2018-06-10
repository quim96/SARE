module.exports = function(app) {

    var express = require('express')

    var Tiquet = require('../controllers/c_tiquets')(app)
    var util = require('../util')

    var router = express.Router();

    router.get('/', util.isRevisor, Tiquet.consultar);
    router.get('/:params', util.isRevisor, Tiquet.consultar);

    return router
}
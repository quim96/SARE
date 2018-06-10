module.exports = function(app) {

    var express = require('express')

    var Sancions = require('../controllers/c_sancions')(app)
    var util = require('../util')

    
    var router = express.Router();

    router.get('/', util.isAdmin, Sancions.getAll);
    router.post('/', util.isRevisor, Sancions.create);

    return router
}
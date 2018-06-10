var TiquetModel = require('../models/m_tiquet');

var TiquetCollectionRevisor = Backbone.Collection.extend({
    model: TiquetModel,
    url: "/api/revisor"
});

module.exports = TiquetCollectionRevisor;
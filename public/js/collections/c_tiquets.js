var TiquetModel = require('../models/m_tiquet');

var TiquetCollection = Backbone.Collection.extend({
    model: TiquetModel,
    url: "/api/tiquets"
});

module.exports = TiquetCollection;
var TiquetModel = require('../models/m_tiquet');

var TiquetUsuariCollection = Backbone.Collection.extend({
    model: TiquetModel,
    url: "/api/users/self/tiquets"
});

module.exports = TiquetUsuariCollection;
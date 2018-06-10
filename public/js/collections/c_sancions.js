var SancioModel = require('../models/m_sancio');

var SancioUsuariCollection = Backbone.Collection.extend({
    model: SancioModel,
    url: "/api/sancions"
});

module.exports = SancioUsuariCollection;
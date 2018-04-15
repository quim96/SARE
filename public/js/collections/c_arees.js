var AreaModel = require('../models/m_area');

var AreaCollection = Backbone.Collection.extend({
    comparator: function( model ) {
        return model.get('nom');
    },
    model: AreaModel,
    url: "/api/arees"
});

module.exports = AreaCollection;

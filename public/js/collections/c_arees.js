var AreaModel = require('../models/m_area');

var AreaCollection = Backbone.Collection.extend({
    comparator: function( model ) {
        if (model.get('nom'))
            return model.get('nom').toLowerCase();
        else
            return model.get('nom');
    },
    model: AreaModel,
    url: "/api/arees"
});

module.exports = AreaCollection;

var VehicleModel = require('../models/m_vehicle');

var VehicleCollection = Backbone.Collection.extend({
    comparator: function( model ) {
        return model.get('matricula');
    },
    model: VehicleModel,
    url: "/api/users/self/vehicles"
});

module.exports = VehicleCollection;

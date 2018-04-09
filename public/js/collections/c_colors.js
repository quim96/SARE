var ColorModel = require('../models/m_color');

var ColorCollection = Backbone.Collection.extend({
    comparator: function( model ) {
        return model.get('nom');
    },
    model: ColorModel,
    url: "/api/colors"
});

module.exports = ColorCollection;

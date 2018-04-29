var MarcaModel = require('../models/m_marca');

var MarcaCollection = Backbone.Collection.extend({
    comparator: function( model ) {
        return model.get('nom');
    },
    model: MarcaModel,
    url: "/api/marcas"
});

module.exports = MarcaCollection;

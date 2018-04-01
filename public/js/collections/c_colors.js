var ColorModel = require('../models/m_order');

var ColorCollection = Backbone.Collection.extend({
  model: ColorModel,
  url: "/api/colors/self/orders"
});

module.exports = ColorCollection;

var t_orderCreate = require("raw-loader!../../../templates/order/t_orderCreate.html")

var OrderCreateView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(t_orderCreate);
  },

  events: {
    'click .remove-icon': 'hide'
  },

  render: function () {
    this.$el.html(this.template({order: this.model}))
    return this
  },

  hide: function() {
    this.eventBus.trigger('view:orderCreate:hide')
  }

});

module.exports = OrderCreateView

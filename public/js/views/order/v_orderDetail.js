var t_orderDetail = require("raw-loader!../../../templates/order/t_orderDetail.html")

var OrderDetailView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(t_orderDetail);
  },

  events: {
    'click .remove-icon': 'hide'
  },

  render: function () {
    this.$el.html(this.template({order: this.model}))
    return this
  },

  hide: function() {
    this.eventBus.trigger('view:orderDetail:hide')
  }

});

module.exports = OrderDetailView

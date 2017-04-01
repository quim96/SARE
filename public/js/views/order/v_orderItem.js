var t_orderItem = require("raw-loader!../../../templates/order/t_orderItem.html")

var OrderItemView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(t_orderItem);
  },

  render: function () {
    this.$el.html(this.template({order: this.model}))
    return this
  }

});

module.exports = OrderItemView

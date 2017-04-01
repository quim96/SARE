var tl_orderItem = require("raw-loader!../../../templates/order/tl_orderItem.html")

var OrderItemView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(tl_orderItem);
  },

  render: function () {
    this.$el.html(this.template({o: this.model}))
    return this
  }

});

module.exports = OrderItemView

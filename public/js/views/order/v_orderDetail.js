var t_orderDetail = require("raw-loader!../../../templates/order/t_orderDetail.html")

var OrderDetailView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(t_orderDetail);
  },

  render: function () {
    this.$el.html(this.template({order: this.model}))
    return this
  }

});

module.exports = OrderDetailView

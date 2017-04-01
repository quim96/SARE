var tl_order = require("raw-loader!../../../templates/order/tl_order.html")
var OrderItemView = require('./v_orderItem')

var OrderListView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(tl_order);
  },

  className: 'container',

  render: function () {
    this.$el.html(this.template({orders: this.collection}))
    var $orderList = this.$el.find('.list-group')
    this.collection.each(function(order) {
      $orderList.append(new OrderItemView({model: order}).render().el)
    })

    return this
  }

});

module.exports = OrderListView

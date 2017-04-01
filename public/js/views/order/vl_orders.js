var tl_order = require("raw-loader!../../../templates/order/tl_order.html")
var OrderItemView = require('./v_orderItem')
var OrderDetailView = require('./v_orderDetail')


var OrderListView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(tl_order)

    this.localEventBus = _.extend({}, Backbone.Events)

    this.localEventBus.on('view:order:detail', this.detail.bind(this))
  },

  className: 'container',

  render: function () {
    this.$el.html(this.template({orders: this.collection}))
    var $orderList = this.$el.find('.list-group')
    var localEventBus = this.localEventBus
    this.collection.each(function(order) {
      $orderList.append(new OrderItemView({model: order, eventBus: localEventBus}).render().el)
    })

    return this
  },

  detail: function(id) {
    this.$el.find('.order-list').addClass('col-md-9').removeClass('col-md-12')
    var $orderDetail = this.$el.find('.order-detail')
    new OrderDetailView({el: $orderDetail, model: this.collection.get(id)}).render()
    $orderDetail.show()
  }

});

module.exports = OrderListView

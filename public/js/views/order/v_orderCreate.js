var t_orderCreate = require("raw-loader!../../../templates/order/t_orderCreate.html")
var Order = require('../../models/m_order')


var OrderCreateView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(t_orderCreate);
  },

  events: {
    'click .remove-icon': 'hide',
    'click [type="submit"]' : 'createOrder'
  },

  render: function () {
    this.$el.html(this.template({order: this.model}))
    return this
  },

  hide: function() {
    this.eventBus.trigger('view:orderCreate:hide')
  },

  createOrder: function() {
    var data = {
      description: this.$el.find('[name="description"]').val()
    }
    var eventBus = this.eventBus
    var order = new Order()
    order.save(data, {
      success: function(order) {
        eventBus.trigger('view:orderCreate:created', order)
      }
    })
  }

});

module.exports = OrderCreateView

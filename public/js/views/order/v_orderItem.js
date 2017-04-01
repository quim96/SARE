var t_orderItem = require("raw-loader!../../../templates/order/t_orderItem.html")

var OrderItemView = Backbone.View.extend({

  initialize: function(params) {
    this.eventBus = params.eventBus;
    this.template = _.template(t_orderItem);
  },

  events: {
    'click li': 'detail'
  },

  render: function () {
    this.$el.html(this.template({order: this.model}))
    return this
  },

  detail: function() {
    this.eventBus.trigger('view:order:detail', this.model.get('id'))
  }

});

module.exports = OrderItemView
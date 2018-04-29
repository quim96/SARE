var tl_order = require("raw-loader!../../../templates/order/tl_order.html");
var OrderItemView = require('./v_orderItem');
var OrderDetailView = require('./v_orderDetail');
var OrderCreateView = require('./v_orderCreate');

var OrderListView = Backbone.View.extend({

    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_order);

        this.lastDetail = null;

        this.localEventBus = _.extend({}, Backbone.Events);

        this.listenTo(this.collection, 'add', this.appendOrder);

        this.localEventBus.on('view:order:detail', this.showDetail.bind(this));
        this.localEventBus.on('view:orderDetail:hide', this.hideDetail.bind(this));
        this.localEventBus.on('view:orderCreate:hide', this.hideDetail.bind(this));

        this.listenTo(this.localEventBus, 'view:orderCreate:created', this.orderCreated)
    },

    events: {
        'click [data-action="new"]' : 'showCreate'
    },

    render: function () {
        this.$el.html(this.template({orders: this.collection}))
        var $orderList = this.$el.find('.list-group')
        var localEventBus = this.localEventBus;
        this.collection.each(function(order) {
            $orderList.append(new OrderItemView({model: order, eventBus: localEventBus}).render().el)
        });
        return this;
    },

    clearDetail: function() {
        if (this.lastDetail) this.lastDetail.undelegateEvents()
    },

    switchDetail: function(view) {
        this.clearDetail();
        this.lastDetail = view;
    },

    showDetail: function(id) {
        this.$el.find('.order-list').addClass('col-md-9').removeClass('col-md-12');
        var $orderDetail = this.$el.find('.order-detail');
        var localEventBus = this.localEventBus;
        this.switchDetail(new OrderDetailView({el: $orderDetail, model: this.collection.get(id), eventBus: localEventBus}).render());
        $orderDetail.show();
    },

    hideDetail: function() {
        var $orderDetail = this.$el.find('.order-detail');
        $orderDetail.hide();
        this.clearDetail();
        this.$el.find('.order-list').addClass('col-md-12').removeClass('col-md-9');
    },

    showCreate: function() {
        this.$el.find('.order-list').addClass('col-md-9').removeClass('col-md-12')
        var $orderDetail = this.$el.find('.order-detail')
        var localEventBus = this.localEventBus
        this.switchDetail(new OrderCreateView({el: $orderDetail, eventBus: localEventBus}).render());
        $orderDetail.show()
    },

    orderCreated: function(order) {
        this.hideDetail()
        this.collection.add(order)
    },

    appendOrder: function(order) {
        var $orderList = this.$el.find('.list-group')
        var localEventBus = this.localEventBus
        $orderList.append(new OrderItemView({model: order, eventBus: localEventBus}).render().el)
    }

});

module.exports = OrderListView

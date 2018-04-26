var t_colorItem = require("raw-loader!../../../templates/estacionament/t_vehicleItem.html")

var VehicleItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_colorItem);
    },
    tagName: 'tr',
    className: 'trCont',
    events: {
        'click td': 'click',
        'click .fa-ban': 'delete'
    },
    render: function () {
        this.$el.html(this.template({item: this.model, marques: this.collection}));
        return this
    },

    click: function() {
        this.eventBus.trigger('view:vehicle:select', this.model.get('id'));
    },

    delete: function () {
        this.eventBus.trigger('view:color:delete', this.model.get('id'));
    }

});

module.exports = VehicleItemView;

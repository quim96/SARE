var t_vehicleItem = require("raw-loader!../../../templates/vehicle/t_vehicleItem.html")

var VehicleItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_vehicleItem);
    },
    tagName: 'tr',
    className: 'trCont',
    events: {
        'click .fa-edit': 'detail',
        'click .fa-ban': 'delete'
    },
    render: function () {
        this.$el.html(this.template({item: this.model}));
        return this
    }

});

module.exports = VehicleItemView;

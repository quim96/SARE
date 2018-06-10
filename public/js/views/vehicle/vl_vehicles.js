var tl_vehicle = require("raw-loader!../../../templates/vehicle/tl_vehicle.html");
var Vehicle = require('../../models/m_vehicle');
var VehicleItemView = require('./v_vehicleItem');
var vehicleEdit;
var VehicleListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_vehicle);

        this.localEventBus = _.extend({}, Backbone.Events);

    },

    events: {
        'keyup .cercar' : 'cercar',
    },
    render: function() {
        this.eventBus.trigger('tab:change', 'vehicle');
        this.$el.html(this.template({vehicles: this.collection}));

        this.carregarTaula();
        return this;
    },
    carregarTaula: function() {
        this.$el.find('.trCont').remove();
        var localEventBus = this.localEventBus;
        $table = this.$el.find('#taula');

        this.collection.each(function(item) {
            $table.append(new VehicleItemView({model: item, eventBus: localEventBus}).render().el);
        });
    },
    cercar: function() {
        var localEventBus = this.localEventBus;
        var src_id = this.$el.find('#txt_id').val();
        var src_matricula = this.$el.find('#txt_matricula').val();
        var src_marca = this.$el.find('#txt_marca').val();
        var src_color = this.$el.find('#txt_color').val();

        var itemCerca = [];
        var aux = this.collection;
        if (src_id != "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_id != "" && item.get("id").toString().toLowerCase().includes(src_id.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
            aux = itemCerca;
        }
        if (src_matricula != "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_matricula != "" && item.get("matricula").toString().toLowerCase().includes(src_matricula.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }
        if (src_marca != "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_marca != "" && item.get("Marca").nom.toString().toLowerCase().includes(src_marca.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }
        if (src_color != "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_color != "" && item.get("Color").nom.toString().toLowerCase().includes(src_color.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }


        if (src_id == "" && src_matricula == "" && src_marca == "" && src_color == "") {
            this.carregarTaula();
        } else {
            this.$el.find('.trCont').remove();
            $table = this.$el.find('#taula');
            itemCerca.forEach(function (item) {
                $table.append(new VehicleItemView({model: item, eventBus: localEventBus}).render().el);
            });
        }
    }

});

module.exports = VehicleListView;

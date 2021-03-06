var tl_tiquet = require("raw-loader!../../../templates/tiquet/tl_tiquet.html");
var TiquetItemView = require('./v_tiquetItem');
var Common = require('../../common');
var TiquetListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.titol = params.titol;
        this.historic = params.historic;
        this.template = _.template(tl_tiquet);

        this.localEventBus = _.extend({}, Backbone.Events);
        },

    events: {
        'keyup .cercar' : 'cercar',
        'click #find' : 'cercarDates'
    },
    render: function() {
        this.eventBus.trigger('tab:change', 'tiquets');
        this.$el.html(this.template({tiquets: this.collection}));

        this.$el.find('.titolPag').text(this.titol);
        console.log(this.historic);
        if (this.historic)
            this.$el.find('.cercador').removeClass('hidden');
        this.carregarTaula();
        return this;
    },
    cercarDates: function() {
        model = this;
        this.collection.fetch(
            {
                data: {
                    dataInici: new Date(this.$el.find('#dataInici').val()),
                    dataFi: new Date(this.$el.find('#dataFi').val())
                }
            }).then(function (collection) {
            this.collection.each(function (item) {
                var data = item.get("dataInici").split('T');
                var dataCurta = data[0].split('-');
                item.set("dataInici", dataCurta[2] + '/' + dataCurta[1] + '/' + dataCurta[0] + ' ' + data[1].split('.')[0]);
                data = item.get("dataFi").split('T');
                dataCurta = data[0].split('-');
                item.set("dataFi", dataCurta[2] + '/' + dataCurta[1] + '/' + dataCurta[0] + ' ' + data[1].split('.')[0]);
            });
            model.carregarTaula();
        });
    },
    carregarTaula: function() {

        this.$el.find('.trCont').remove();
        var localEventBus = this.localEventBus;
        $table = this.$el.find('#taula');

        this.collection.each(function(item) {
            $table.append(new TiquetItemView({model: item, eventBus: localEventBus}).render().el);
        });
        aux = this.collection;
    },
    cercar: function() {
        var localEventBus = this.localEventBus;
        var src_id = this.$el.find('#txt_id').val();
        var src_mat = this.$el.find('#txt_mat').val();
        var src_marca = this.$el.find('#txt_marca').val();
        var src_color = this.$el.find('#txt_color').val();
        var src_area = this.$el.find('#txt_area').val();
        var src_dataIn = Common.normalizeDateTime(this.$el.find('#txt_dataIn').val());
        var src_dataFi = Common.normalizeDateTime(this.$el.find('#txt_dataFi').val());
        var itemCerca = [];
        var aux = this.collection;
        if (src_id !== "" ) {
            aux.forEach(function (item) {
                if (src_id !== "" && item.get("id").toString().toLowerCase().includes(src_id.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
            aux = itemCerca;
        }
        if (src_dataIn !== "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_dataIn !== "" && item.get("dataInici").toString().toLowerCase().includes(src_dataIn.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
            aux = itemCerca;
        }

        if (src_dataFi !== "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_dataFi !== "" && item.get("dataFi").toString().toLowerCase().includes(src_dataFi.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
            aux = itemCerca;
        }

        if (src_mat !== "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_mat !== "" && item.get('Vehicle').matricula.toString().toLowerCase().includes(src_mat.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
            aux = itemCerca;
        }

        if (src_marca !== "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_marca !== "" && item.get('Vehicle').Marca != null && item.get('Vehicle').Marca.nom.toString().toLowerCase().includes(src_marca.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
            aux = itemCerca;
        }

        if (src_color !== "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_color !== "" && item.get('Vehicle') != null && item.get('Vehicle').Color != null && item.get('Vehicle').Color.nom.toString().toLowerCase().includes(src_color.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
            aux = itemCerca;
        }

        if (src_area !== "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_area !== "" && item.get('Area') != null && item.get('Area').nom.toString().toLowerCase().includes(src_area.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }

        if (src_marca === "" && src_color === "" && src_id === "" && src_dataIn === "" && src_mat === "" && src_area === "") {
            this.carregarTaula();
        } else {
            this.$el.find('.trCont').remove();
            $table = this.$el.find('#taula');
            itemCerca.forEach(function (item) {
                $table.append(new TiquetItemView({model: item, eventBus: localEventBus}).render().el);
            });
        }
    },

});

module.exports = TiquetListView;

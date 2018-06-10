var tl_sancio = require("raw-loader!../../../templates/sancio/tl_sancio.html");
var Sancio = require('../../models/m_sancio')
var SancioItemView = require('./v_sancioItem');
var SancioListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_sancio);

        this.localEventBus = _.extend({}, Backbone.Events);
    },

    events: {
        'click .enviar' : 'save',
        'keyup .cercar' : 'cercar',
        'click #find' : 'cercarDates'
    },
    render: function() {
        this.eventBus.trigger('tab:change', 'sancio');
        this.$el.html(this.template({sancios: this.collection}));
        this.collection.each(function(item) {
            var data = item.get("data").split('T');
            var dataCurta = data[0].split('-');
            item.set("data", dataCurta[2] + '/' + dataCurta[1] + '/' + dataCurta[0] + ' ' + data[1].split('.')[0]);
        });
        this.carregarTaula();
        return this;
    },
    carregarTaula: function() {
        this.$el.find('.trCont').remove();
        var localEventBus = this.localEventBus;
        $table = this.$el.find('#taula');

        this.collection.each(function(item) {
            $table.append(new SancioItemView({model: item, eventBus: localEventBus}).render().el);
        });
    },
    cercarDates: function() {
        console.log(new Date(this.$el.find('#dataInici').val()));
        $.when(this.collection.fetch(
            {
                data: {
                    dataInici: new Date(this.$el.find('#dataInici').val()),
                    dataFi: new Date(this.$el.find('#dataFi').val())
                }
            })).then(function () {
            console.log(this.collection)
        });
    },
    cercar: function() {
        var localEventBus = this.localEventBus;
        var src_id = this.$el.find('#txt_id').val();
        var src_nom = this.$el.find('#txt_nom').val();
        var src_marca = this.$el.find('#txt_marca').val();
        var src_area = this.$el.find('#txt_area').val();
        var src_data = this.$el.find('#txt_data').val();

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
        if (src_nom != "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_nom != "" && item.get("nom").toString().toLowerCase().includes(src_nom.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }
        if (src_marca != "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_marca != "" && item.get("Vehicle").Marca.nom.toString().toLowerCase().includes(src_marca.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }
        if (src_area != "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_area != "" && item.get("Area").nom.toString().toLowerCase().includes(src_area.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }
        if (src_data != "" ) {
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_data != "" && item.get("data").toString().toLowerCase().includes(src_data.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }

        if (src_id == "" && src_nom == "" && src_marca == "" && src_area == "" && src_data == "") {
            this.carregarTaula();
        } else {
            this.$el.find('.trCont').remove();
            $table = this.$el.find('#taula');
            itemCerca.forEach(function (item) {
                $table.append(new SancioItemView({model: item, eventBus: localEventBus}).render().el);
            });
        }
    }

});

module.exports = SancioListView;

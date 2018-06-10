var tl_sancio = require("raw-loader!../../../templates/sancio/tl_sancio.html");
var Sancio = require('../../models/m_sancio')
var SancioItemView = require('./v_sancioItem');
var sancioEdit;
var SancioListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_sancio);

        this.localEventBus = _.extend({}, Backbone.Events);

        this.localEventBus.on('view:sancio:edit', this.showEdit.bind(this));
        this.localEventBus.on('view:sancio:delete', this.showDelete.bind(this));
    },

    events: {
        'click .crear' : 'showCreate',
        'click .enviar' : 'save',
        'keyup .cercar' : 'cercar',
        'click #btnEsborrar' : 'delete'
    },
    render: function() {
        this.eventBus.trigger('tab:change', 'sancio');
        this.$el.html(this.template({sancios: this.collection}));

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
    cercar: function() {
        var localEventBus = this.localEventBus;
        var src_id = this.$el.find('#txt_id').val();
        var src_nom = this.$el.find('#txt_nom').val();

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

        if (src_id == "" && src_nom == "") {
            this.carregarTaula();
        } else {
            this.$el.find('.trCont').remove();
            $table = this.$el.find('#taula');
            itemCerca.forEach(function (item) {
                $table.append(new SancioItemView({model: item, eventBus: localEventBus}).render().el);
            });
        }
    },
    showCreate: function() {
        this.$el.find('.titolPag').text("Crear Sancio");
        this.$el.find('#nom').val('');
        this.showCreEdi();
    },
    showCreEdi(){
        this.$el.find('#popupCrearEditar').modal();
    },
    save: function() {
        if (sancioEdit == null) {
            var data = {
                nom: this.$el.find('#nom').val()
            };
            var sancio = new Sancio();
            var model = this;
            sancio.save(data, {
                success: function(sancio) {
                    model.add(sancio);
                }
            });
        } else {
            sancioEdit.set('nom', this.$el.find('#nom').val());
            var model = this;
            sancioEdit.save().then(function (sancio) {
                model.$el.find('#popupCrearEditar').modal('hide');
                model.render();
            });
        }

    },
    add: function(item) {
        this.collection.add(item);
        this.$el.find('#popupCrearEditar').modal('hide');
        this.render();
    },
    showEdit: function(id) {
        sancioEdit =  this.collection.get(id);
        this.$el.find('.titolPag').text("Editar sancio " + sancioEdit.get("id"));
        this.showCreEdi();
        this.$el.find('#nom').val(sancioEdit.get('nom'));
    },
    showDelete: function(id) {
        sancioEdit =  this.collection.get(id);
        this.$el.find('#esborrarCol').text(sancioEdit.get('nom'));
        this.$el.find('#popup').modal();
    },
    delete: function () {
        var model = this;
        sancioEdit.destroy({
            success: function(removed, data) {
                model.$el.find('#popup').modal('hide');
                model.render();
            },
            error: function(aborted, response) {
                model.$el.find('#popup').modal('hide');
                this.render();
            }
        });
    }




});

module.exports = SancioListView;

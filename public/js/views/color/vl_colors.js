var tl_color = require("raw-loader!../../../templates/color/tl_color.html");
var Color = require('../../models/m_color')
var ColorItemView = require('./v_colorItem');
var colorEdit;
var ColorListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_color);

        this.localEventBus = _.extend({}, Backbone.Events);

        this.localEventBus.on('view:color:edit', this.showEdit.bind(this));
        this.localEventBus.on('view:color:delete', this.showDelete.bind(this));
    },

    events: {
        'click .crear' : 'showCreate',
        'click .tornar' : 'showContent',
        'click .enviar' : 'save',
        'keyup .cercar' : 'cercar',
        'click #btnEsborrar' : 'delete'
    },
    render: function() {
        this.eventBus.trigger('tab:change', 'color');
        this.$el.html(this.template({colors: this.collection}));

        this.showContent();
        this.carregarTaula();
        return this;
    },
    carregarTaula: function() {
        this.$el.find('.trCont').remove();
        var localEventBus = this.localEventBus;
        $table = this.$el.find('#taula');

        this.collection.each(function(item) {
            $table.append(new ColorItemView({model: item, eventBus: localEventBus}).render().el);
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
                $table.append(new ColorItemView({model: item, eventBus: localEventBus}).render().el);
            });
        }
    },
    showCreate: function() {
        this.$el.find('.titolPag').text("Crear Color");
        this.$el.find('#nom').val('');
        this.showCreEdi();
    },
    showCreEdi(){
        this.$el.find('.contingut').hide();
        this.$el.find('.crearEditar').show();
    },
    showContent: function() {
        colorEdit = null;
        this.$el.find('.titolPag').text("Colors");
        this.$el.find('.crearEditar').hide();
        this.$el.find('.contingut').show();
    },
    save: function() {
        if (colorEdit == null) {
            var data = {
                nom: this.$el.find('#nom').val()
            };
            var color = new Color();
            var model = this;
            color.save(data, {
                success: function(color) {
                    model.add(color);
                }
            });
        } else {
            colorEdit.set('nom', this.$el.find('#nom').val());
            var model = this;
            colorEdit.save().then(function (color) {
                model.render();
            });
        }

    },
    add: function(item) {
        this.collection.add(item);
        this.render();
    },
    showEdit: function(id) {
        colorEdit =  this.collection.get(id);
        this.$el.find('.titolPag').text("Editar color " + colorEdit.get("id"));
        this.showCreEdi();
        this.$el.find('#nom').val(colorEdit.get('nom'));
    },
    showDelete: function(id) {
        colorEdit =  this.collection.get(id);
        this.$el.find('#esborrarCol').text(colorEdit.get('nom'));
        this.$el.find('#popup').modal();
    },
    delete: function () {
        var model = this;
        colorEdit.destroy({
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

module.exports = ColorListView;

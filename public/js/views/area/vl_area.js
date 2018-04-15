var tl_area = require("raw-loader!../../../templates/area/tl_area.html");
var Area = require('../../models/m_area')
var AreaItemView = require('./v_areaItem');
var areaEdit;
var AreaListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_area);
        this.lastDetail = null;

        this.localEventBus = _.extend({}, Backbone.Events);

        this.localEventBus.on('view:area:edit', this.showEdit.bind(this));
        this.localEventBus.on('view:area:delete', this.showDelete.bind(this));
    },

    events: {
        'click .crear' : 'showCreate',
        'click .tornar' : 'showContent',
        'click .enviar' : 'save',
        'keyup .cercar' : 'cercar',
        'click #btnEsborrar' : 'delete'
    },
    render: function() {
        this.eventBus.trigger('tab:change', 'area');
        this.$el.html(this.template({areas: this.collection}));

        this.showContent();
        this.collection;
        this.carregarTaula();
        return this;
    },
    carregarTaula: function() {
        this.$el.find('.trCont').remove();
        var localEventBus = this.localEventBus;
        $table = this.$el.find('#taula');

        this.collection.each(function(item) {
            $table.append(new AreaItemView({model: item, eventBus: localEventBus}).render().el);
        });
    },
    cercar: function() {
        var localEventBus = this.localEventBus;
        var src_id = this.$el.find('#txt_id').val();
        var src_nom = this.$el.find('#txt_nom').val();
        var src_preuMin = this.$el.find('#txt_preuMin').val();
        var src_maxMin = this.$el.find('#txt_maxMin').val();
        var itemCerca = this.collection;
        aux = itemCerca;
        if (src_id != "" ) {
            aux.forEach(function (item) {
                if (src_id != "" && item.get("id").toString().toLowerCase().includes(src_id.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }
        if (src_nom != "" ) {
            aux = itemCerca;
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_nom != "" && item.get("nom").toString().toLowerCase().includes(src_nom.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }
        if (src_preuMin != "" ) {
            aux = itemCerca;
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_preuMin != "" && item.get("preuMinut").toString().toLowerCase().includes(src_preuMin.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }
        if (src_maxMin != "" ) {
            aux = itemCerca;
            itemCerca = [];
            aux.forEach(function (item) {
                if (src_maxMin != "" && item.get("maxMinuts").toString().toLowerCase().includes(src_maxMin.toLowerCase())) {
                    itemCerca.push(item);
                }
            });
        }


        if (src_id == "" && src_nom == "" && src_maxMin == "" && src_preuMin == "") {
            this.carregarTaula();
        } else {
            this.$el.find('.trCont').remove();
            $table = this.$el.find('#taula');
            itemCerca.forEach(function (item) {
                $table.append(new AreaItemView({model: item, eventBus: localEventBus}).render().el);
            });
        }
    },
    showCreate: function() {
        this.$el.find('.titolPag').text("Crear area");
        this.$el.find('#nom').val('');
        this.showCreEdi();
    },
    showCreEdi(){
        this.$el.find('.contingut').hide();
        this.$el.find('.crearEditar').show();
    },
    showContent: function() {
        areaEdit = null;
        this.$el.find('.titolPag').text("areas");
        this.$el.find('.crearEditar').hide();
        this.$el.find('.contingut').show();
    },
    save: function() {
        if (areaEdit == null) {
            var data = {
                nom: this.$el.find('#nom').val(),
                preuMinut: this.$el.find('#preuMinut').val(),
                maxMinuts: this.$el.find('#maxMinuts').val()
            };
            var area = new Area();
            var model = this;
            area.save(data, {
                success: function(area) {
                    model.add(area);
                }
            });
        } else {
            areaEdit.set('nom', this.$el.find('#nom').val());
            areaEdit.set('preuMinut', this.$el.find('#preuMinut').val());
            areaEdit.set('maxMinuts', this.$el.find('#maxMinuts').val());
            var model = this;
            areaEdit.save().then(function () {
                model.render();
            });
        }

    },
    add: function(item) {
        this.collection.add(item);
        this.render();
    },
    showEdit: function(id) {
        areaEdit =  this.collection.get(id);
        this.showCreEdi();
        console.log(areaEdit);
        ttt = areaEdit;
        console.log(areaEdit.get('preuMinut'));
        this.$el.find('#nom').val(areaEdit.get('nom'));
        this.$el.find('#preuMinut').val(areaEdit.get('preuMinut'));
        this.$el.find('#maxMinuts').val(areaEdit.get('maxMinuts'));
    },
    showDelete: function(id) {
        areaEdit =  this.collection.get(id);
        console.log(areaEdit);
        this.$el.find('#esborrarCol').text(areaEdit.get('nom'));
        this.$el.find('#popup').modal();
    },
    delete: function () {
        var model = this;
        areaEdit.destroy({
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

module.exports = AreaListView;

var tl_color = require("raw-loader!../../../templates/color/tl_color.html");
var Color = require('../../models/m_color')
var ColorItemView = require('./v_colorItem');
var colorEdit;
var ColorListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_color);

        this.lastDetail = null;

        this.localEventBus = _.extend({}, Backbone.Events);

        this.localEventBus.on('view:color:edit', this.showEdit.bind(this));
        this.localEventBus.on('view:color:delete', this.showDelete.bind(this));
    },

    events: {
        'click .crear' : 'showCreate',
        'click .tornar' : 'showContent',
        'click .enviar' : 'save',
        'click #btnEsborrar' : 'delete'
    },
    render: function () {
        this.$el.html(this.template({colors: this.collection}));
        this.showContent();
        var localEventBus = this.localEventBus;
        $table = this.$el.find('#taula');
        this.collection.each(function(item) {
            $table.append(new ColorItemView({model: item, eventBus: localEventBus}).render().el);
        });
        return this;
    },

    edit: function(element) {
        console.log($(element.currentTarget).closest('tr').attr('id'));
        aux = $(element.currentTarget);
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
                    model.test(color);
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
    test: function(item) {
        this.collection.add(item);
        this.render();
    },
    showEdit: function(id) {
        colorEdit =  this.collection.get(id);
        this.showCreEdi();
        this.$el.find('#nom').val(colorEdit.get('nom'));
    },
    showDelete: function(id) {
        colorEdit =  this.collection.get(id);
        console.log(colorEdit);
        this.$el.find('#esborrarCol').text(colorEdit.get(nom));
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

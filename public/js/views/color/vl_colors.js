var tl_color = require("raw-loader!../../../templates/color/tl_color.html");
var Color = require('../../models/m_color')
var ColorItemView = require('./v_colorItem');

var ColorListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_color);

        this.lastDetail = null;

        this.localEventBus = _.extend({}, Backbone.Events);

    },

    events: {
        'click .crear' : 'showCreate',
        'click .tornar' : 'showContent',
        'click .enviar' : 'create',
        'click .fa-edit': 'edit'
    },

    render: function () {
        this.$el.html(this.template({colors: this.collection}));
        this.showContent();
        var localEventBus = this.localEventBus;
        $table = this.$el.find('#taula');
        this.collection.each(function(item) {
            $table.append(new ColorItemView({model: item, eventBus: localEventBus}).render().el.childNodes);
        });
        return this;
    },

    edit: function(element) {
        console.log($(element.currentTarget).closest('tr').attr('id'));
        aux = $(element.currentTarget);
    },

    showCreate: function() {
        this.$el.find('.titolPag').text("Crear Color");
        this.$el.find('.contingut').hide();
        this.$el.find('.crearEditar').show();
    },
    showContent: function() {
        this.$el.find('.titolPag').text("Colors");
        this.$el.find('.crearEditar').hide();
        this.$el.find('.contingut').show();
    },
    create: function() {
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
    },
    test: function(item) {
        this.collection.add(item);
        this.render();
    }



});

module.exports = ColorListView;

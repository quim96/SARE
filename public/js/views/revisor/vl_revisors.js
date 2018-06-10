var tl_revisor = require("raw-loader!../../../templates/revisor/tl_revisor.html");
var RevisorListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_revisor);

        this.localEventBus = _.extend({}, Backbone.Events);
    },

    events: {
        'click #consultar': 'consultar'
    },
    render: function() {
        this.$el.html(this.template({revisors: this.collection}));
        return this;
    },
    consultar: function () {
        model = this;
        this.collection.fetch(
            {
                data: {
                    matricula: model.$el.find('#matricula').val()
                }
            }).then(function () {
            model.carregarResultats();
        });
        this.$el.find('.trCont').val()
    },
    carregarResultats: function () {
        this.$el.find('#mat').text(this.$el.find('#matricula').val().toString())
        if(this.collection.length == 0) {
            this.$el.find('#resultat').text('No Té Tiquet Actiu');
        } else {
            this.$el.find('#resultat').text('Té Tiquet Actiu');
        }
    }

});

module.exports = RevisorListView;

var tl_tiquet = require("raw-loader!../../../templates/tiquetUsuari/tl_tiquet.html");
var TiquetItemView = require('./v_tiquetItem');
var TiquetListView = Backbone.View.extend({

    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_tiquet);
        this.localEventBus = _.extend({}, Backbone.Events);
    },

    events: {
    },
    render: function() {
        this.eventBus.trigger('tab:change', 'homeUsuari');
        this.$el.html(this.template({tiquets: this.collection, dada: this.dada}));
        $list = this.$el.find('.cont');
        this.collection.each( function(item) {
            $list.append(new TiquetItemView({model: item}).render().el)
        });
        return this;
    }

});

module.exports = TiquetListView;
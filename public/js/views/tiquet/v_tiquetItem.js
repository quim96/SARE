var t_tiquetItem = require("raw-loader!../../../templates/tiquet/t_tiquetItem.html")

var TiquetItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_tiquetItem);
    },
    tagName: 'tr',
    className: 'trCont',
    events: {
        'click .fa-edit': 'detail',
        'click .fa-ban': 'delete'
    },
    render: function () {
        this.$el.html(this.template({item: this.model}));
        return this
    },

    detail: function() {
        this.eventBus.trigger('view:tiquet:edit', this.model.get('id'));
    },

    delete: function () {
        this.eventBus.trigger('view:tiquet:delete', this.model.get('id'));
    }

});

module.exports = TiquetItemView;

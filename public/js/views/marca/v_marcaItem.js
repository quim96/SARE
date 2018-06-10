var t_marcaItem = require("raw-loader!../../../templates/marca/t_marcaItem.html")

var MarcaItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_marcaItem);
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
        this.eventBus.trigger('view:marca:edit', this.model.get('id'));
    },

    delete: function () {
        this.eventBus.trigger('view:marca:delete', this.model.get('id'));
    }

});

module.exports = MarcaItemView;

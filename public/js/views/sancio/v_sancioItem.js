var t_sancioItem = require("raw-loader!../../../templates/sancio/t_sancioItem.html")

var SancioItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_sancioItem);
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
        this.eventBus.trigger('view:sancio:edit', this.model.get('id'));
    },

    delete: function () {
        this.eventBus.trigger('view:sancio:delete', this.model.get('id'));
    }

});

module.exports = SancioItemView;

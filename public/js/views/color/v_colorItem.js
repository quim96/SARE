var t_colorItem = require("raw-loader!../../../templates/color/t_colorItem.html")

var ColorItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_colorItem);
    },
    tagName: 'tr',
    events: {
        'click .fa-edit': 'detail',
        'click .fa-ban': 'delete'
    },
    render: function () {
        this.$el.html(this.template({item: this.model}));
        return this
    },

    detail: function() {
        this.eventBus.trigger('view:color:edit', this.model.get('id'));
    },

    delete: function () {
        this.eventBus.trigger('view:color:delete', this.model.get('id'));
    }

});

module.exports = ColorItemView;

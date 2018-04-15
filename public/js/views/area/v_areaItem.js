var t_colorItem = require("raw-loader!../../../templates/area/t_areaItem.html")

var AreaItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_colorItem);
    },
    tagName: 'tr',
    className: 'trCont',
    events: {
        'click .fa-edit': 'edit',
        'click .fa-ban': 'delete'
    },
    render: function () {
        this.$el.html(this.template({item: this.model}));
        return this
    },

    edit: function() {
        this.eventBus.trigger('view:area:edit', this.model.get('id'));
    },

    delete: function () {
        this.eventBus.trigger('view:area:delete', this.model.get('id'));
    }

});

module.exports = AreaItemView;

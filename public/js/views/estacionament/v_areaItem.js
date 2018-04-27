var t_colorItem = require("raw-loader!../../../templates/estacionament/t_areaItem.html")

var AreaItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_colorItem);
    },
    tagName: 'tr',
    className: 'trCont',
    events: {
        'click td': 'click'
    },
    render: function () {
        this.$el.html(this.template({item: this.model, marques: this.collection}));
        return this
    },

    click: function() {
        this.eventBus.trigger('view:area:select', this.model.get('id'));
    }
});

module.exports = AreaItemView;

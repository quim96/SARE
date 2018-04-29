var t_tiquetItem = require("raw-loader!../../../templates/tiquet/t_tiquetItem.html")

var TiquetItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_tiquetItem);
    },
    tagName: 'tr',
    className: 'trCont',
    render: function () {
        this.$el.html(this.template({item: this.model}));
        return this
    }
});

module.exports = TiquetItemView;

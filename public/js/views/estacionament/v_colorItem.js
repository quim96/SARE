var t_colorItem = require("raw-loader!../../../templates/estacionament/t_colorItem.html")

var ColorItemView = Backbone.View.extend({
    initialize: function(params) {
        this.template = _.template(t_colorItem);
    },
    tagName: 'option',
    className: 'optCont',
    value: '33',
    render: function () {
        this.$el.html(this.template({item: this.model}));
        return this
    }
});

module.exports = ColorItemView;

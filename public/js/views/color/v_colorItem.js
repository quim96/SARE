var t_colorItem = require("raw-loader!../../../templates/color/t_colorItem.html")

var ColorItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_colorItem);
    },

    events: {
        'click li': 'detail'
    },

    render: function () {
        this.$el.html(this.template({item: this.model}))
        return this
    },

    detail: function() {
        this.eventBus.trigger('view:order:detail', this.model.get('id'))
    }

});

module.exports = ColorItemView;

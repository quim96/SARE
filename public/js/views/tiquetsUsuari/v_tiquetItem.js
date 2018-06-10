var t_tiquetItem = require("raw-loader!../../../templates/tiquetUsuari/t_tiquetItem.html")

var TiquetItemView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(t_tiquetItem);
    },
    className: 'trCont',
    render: function () {
        this.$el.html(this.template({item: this.model}));
        var model= this;
        this.actualitzar();
        setInterval(function() {
            model.actualitzar();
        }, 1000 );
        return this
    },
    actualitzar: function () {
        var dada  = (new Date(this.model.get('dataFi')).getTime() - new Date().getTime())/1000;
        if (dada > 60) {
            this.$el.find('#seg').text(("0" + (dada%60).toFixed(0)).slice(-2));
            var min = Math.floor(dada/60);
            if (min > 60) {
                this.$el.find('#min').text(("0" + Math.floor(min%60)).slice(-2));
                this.$el.find('#hor').text(("0" + Math.floor(min/60)).slice(-2));
            } else {
                this.$el.find('#min').text(("0" + min).slice(-2));
                this.$el.find('#hor').text(0);
            }
        } else if (dada > 0){
            this.$el.find('#seg').text(("0" + dada).slice(-2));
            this.$el.find('#min').text("00");
            this.$el.find('#hor').text("00");

        } else {
            this.$el.find('#seg').text("00");
        }
    }
});

module.exports = TiquetItemView;

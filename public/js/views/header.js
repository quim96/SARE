var t_header = require("raw-loader!../../templates/header.html");

var userData = {};

var Header = Backbone.View.extend({

    initialize: function (params) {
        this.template = _.template(t_header)
        this.eventBus = params.eventBus;
        this.eventBusGlob = params.eventBusGlob;

        if (params.user)
            this.setUserData(params.user);

        var view = this;

        this.eventBusGlob.on('tab:change', this.activar.bind(this));
        params.eventBus.on('localstorage:set:user', function(user) {
            view.setUserData(user);
            view.render();
        });
        params.eventBus.on('localstorage:remove:user', function () {
            view.setUserData(false);
            view.render();
        })
    },

    events: {
        'click .glyphicon-log-out' : 'logout',
        'click .c_tab' : 'activar'
    },

    render: function () {
        this.$el.html(this.template({user: userData}));
        return this
    },

    setUserData: function (user) {
        userData = user
    },
    activar: function (item) {
        this.$el.find('.active').removeClass('active');
        if (item === "home") {
            this.$el.find('#nav_home').addClass('active');
        } else if (item === "color") {
            this.$el.find('#nav_color').addClass('active');
        } else if (item === "area") {
            this.$el.find('#nav_area').addClass('active');
        } else if (item === "tiquets") {
            this.$el.find('#nav_tiquets').addClass('active');
        }
        else if (item === "estacionament") {
            this.$el.find('#estacionament').addClass('active');
        }

    },
    logout: function() {
        this.eventBusGlob.trigger('view:logout:request')
    }

})

module.exports = Header
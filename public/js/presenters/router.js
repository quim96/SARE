var EventBus = require('../eventBus')
var localStorage = require('../localStorage')

var Router = {}

Router.init = function () {
    var AppRouter = Backbone.Router.extend({
        routes: {
            // Define some URL routes
            '': 'home',
            'signup': 'signup',
            'login': 'home',
            'orders': 'showOrders',
            'colors': 'showColors',
            'arees': 'showArees',
            'tiquetsDia': 'showTiquetsDia',
            'tiquetsAct': 'showTiquetsAct',
            'tiquetsHist': 'showTiquetsHist',
            'estacionament': 'showEstacionament',
            'homeUsuari': 'showHomeUsuari',
            'marques': 'showMarques',
            'sancions': 'showSancions',
            'vehicles': 'showVehicles',
            'revisor': 'showRevisor',

            // Default
            '*actions': 'defaultAction'
        },

        home: function () {
            EventBus.trigger('ui:showHome')
        },

        signup: function () {
            EventBus.trigger('ui:switch:signup')
        },

        showOrders: function () {
            EventBus.trigger('ui:switch:orders')
        },

        showColors: function () {
            EventBus.trigger('ui:switch:colors')
        },

        showArees: function () {
            EventBus.trigger('ui:switch:arees')
        },

        showTiquetsDia: function () {
            EventBus.trigger('ui:switch:tiquetsDia')
        },
        showTiquetsAct: function () {
            EventBus.trigger('ui:switch:tiquetsAct')
        },
        showEstacionament: function () {
            EventBus.trigger('ui:switch:estacionament')
        },
        showHomeUsuari: function () {
            EventBus.trigger('ui:switch:homeUsuari')
        },
        showMarques: function () {
            EventBus.trigger('ui:switch:marques')
        },
        showSancions: function () {
            EventBus.trigger('ui:switch:sancions')
        },
        showTiquetsHist: function () {
            EventBus.trigger('ui:switch:tiquetsHist')
        },
        showVehicles: function () {
            EventBus.trigger('ui:switch:vehicles')
        },
        showRevisor: function () {
            EventBus.trigger('ui:switch:revisor')
        }

    });

    new AppRouter();

    Backbone.history.start()
}

module.exports = Router;
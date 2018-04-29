var EventBus = require('../eventBus');
var localStorage = require('../localStorage');
var CollectionOrder = require("../collections/c_orders");
var CollectionColor = require("../collections/c_colors");
var CollectionArea = require("../collections/c_arees");
var CollectionTiquet = require("../collections/c_tiquets");
var CollectionVehicle = require("../collections/c_vehicles");
var CollectionMarca = require("../collections/c_marcas");
var UserLogin = require("../views/user/v_login");
var UserSignup = require("../views/user/v_signup");
var HeaderView = require("../views/header");
var OrdersView = require("../views/order/vl_orders");
var ColorView = require("../views/color/vl_colors");
var AreaView = require("../views/area/vl_area");
var TiquetView = require("../views/tiquet/vl_tiquets");
var EstacionamentView = require("../views/estacionament/vl_estacionament");

var Ui = {};

var orderList = new CollectionOrder({eventBus: EventBus});
var colorList = new CollectionColor ({eventBus: EventBus});
var marcaList = new CollectionMarca ({eventBus: EventBus});
var areaList = new CollectionArea ({eventBus: EventBus});
var tiquetList = new CollectionTiquet ({eventBus: EventBus});
var vehicleList = new CollectionVehicle ({eventBus: EventBus});

var $content = $('#content');

var lastHeader = null;
var lastContent = null;

Ui.switchContent = function (widget) {
    if (lastContent) lastContent.undelegateEvents()

    var args = Array.prototype.slice.call(arguments)
    args.shift()
    switch (widget) {
        case 'login': {
            lastContent = new UserLogin({el: $content, eventBus: EventBus}).render()
            break
        }
        case 'signup': {
            lastContent = new UserSignup({el: $content, eventBus: EventBus}).render()
            break
        }
        case 'orders': {
            localStorage.setItem('last', 'orders');
            if (localStorage.hasItem('user')) {
                orderList.fetch({
                    success: function () {
                        lastContent = new OrdersView({el: $content, eventBus: EventBus, collection: orderList}).render()
                    },
                    error: Ui.error
                });
            } else
                Ui.switchContent('login');
            break;
        }
        case 'colors': {
            localStorage.setItem('last', 'colors');
            if (localStorage.hasItem('user')) {
                colorList.fetch({
                    success: function () {
                        lastContent = new ColorView({el: $content, eventBus: EventBus, collection: colorList}).render();
                    },
                    error: Ui.error
                });
            } else
                Ui.switchContent('login');
            break;
        }
        case 'arees': {
            localStorage.setItem('last', 'arees');
            if (localStorage.hasItem('user')) {
                areaList.fetch({
                    success: function () {
                        lastContent = new AreaView({el: $content, eventBus: EventBus, collection: areaList}).render();
                    },
                    error: Ui.error
                });
            } else
                Ui.switchContent('login');
            break;
        }
        case 'tiquetsDia': {
            localStorage.setItem('last', 'tiquetsDia');
            if (localStorage.hasItem('user')) {
                tiquetList.fetch({
                    data: {data: new Date()},
                    processData: true,
                    success: function () {
                        lastContent = new TiquetView({titol: 'Tiquets Dia Actual', el: $content, eventBus: EventBus, collection: tiquetList}).render();
                    },
                    error: Ui.error
                });
            } else
                Ui.switchContent('login');
            break;
        }
        case 'tiquetsAct': {
            localStorage.setItem('last', 'tiquetsAct');
            if (localStorage.hasItem('user')) {
                tiquetList.fetch({
                    data: {dataFi: new Date()},
                    processData: true,
                    success: function () {
                        lastContent = new TiquetView({titol: 'Tiquets Actius', el: $content, eventBus: EventBus, collection: tiquetList}).render();
                    },
                    error: Ui.error
                });
            } else
                Ui.switchContent('login');
            break;
        }
        case 'estacionament': {
            localStorage.setItem('last', 'estacionament');
            if (localStorage.hasItem('user')) {
                vehicleList.fetch({
                    success: function (){
                        marcaList.fetch({
                            success: function (){
                                areaList.fetch({
                                    success: function (){
                                        lastContent = new EstacionamentView({
                                            el: $content, eventBus: EventBus, collection: {
                                                vehicles: vehicleList,
                                                colors: colorList,
                                                marcas: marcaList,
                                                arees: areaList
                                            }
                                        }).render();
                                    }
                                })
                            }
                        });
                    }
                });
            } else
                Ui.switchContent('login');
            break;
        }
    }
}

Ui.init = function () {
    lastHeader = new HeaderView({el: '#header', eventBus: localStorage, eventBusGlob: EventBus, user: localStorage.getItem('user')}).render()
};

Ui.showHome = function () {
    if (localStorage.hasItem('user')) {
        Ui.switchContent('orders')
    } else {
        Ui.switchContent('login')
    }
};

Ui.showLast = function () {
    if (localStorage.hasItem('last')) {
        Ui.switchContent(localStorage.getItem('last'))
    } else {
        Ui.switchContent('tiquetsAct')
    }

};

Ui.showSignup = function () {
    Ui.switchContent('signup');
};

// This always receive a JSON object with a standard API error
Ui.error = function (err, response) {
    if (response.status === 400){
        if(localStorage.hasItem('user'))
            localStorage.removeItem('user');
        Ui.switchContent('login');
    }
    else if (err.message)
        alert("Error: " + err.message);
    else if (err.responseJSON) {
        if (err.responseJSON.message)
            alert("Error: " + err.responseJSON.message);
        else if (err.responseJSON.error)
            alert("Error: " + err.responseJSON.error.message);
    }
};
EventBus.on('ui:showLast', Ui.showLast);
EventBus.on('ui:showHome', Ui.showHome);
EventBus.on('ui:showError', Ui.error);
EventBus.on('ui:switch:signup', Ui.showSignup);
EventBus.on('ui:switch:orders', Ui.switchContent.bind(null, 'orders'));
EventBus.on('ui:switch:colors', Ui.switchContent.bind(null, 'colors'));
EventBus.on('ui:switch:arees', Ui.switchContent.bind(null, 'arees'));
EventBus.on('ui:switch:tiquetsDia', Ui.switchContent.bind(null, 'tiquetsDia'));
EventBus.on('ui:switch:tiquetsAct', Ui.switchContent.bind(null, 'tiquetsAct'));
EventBus.on('ui:switch:estacionament', Ui.switchContent.bind(null, 'estacionament'));


module.exports = Ui;


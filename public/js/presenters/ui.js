var EventBus = require('../eventBus');
var localStorage = require('../localStorage');
var CollectionColor = require("../collections/c_colors");
var CollectionArea = require("../collections/c_arees");
var CollectionTiquet = require("../collections/c_tiquets");
var CollectionTiquetUser  = require("../collections/c_tiquetsUsuari");
var CollectionVehicleUser = require("../collections/c_vehiclesUser");
var CollectionVehicle = require("../collections/c_vehicles");
var CollectionMarca = require("../collections/c_marcas");
var CollectionRevisor = require("../collections/c_tiquetsRevisor");
var CollectionSancio = require("../collections/c_sancions");
var UserLogin = require("../views/user/v_login");
var UserSignup = require("../views/user/v_signup");
var HeaderView = require("../views/header");
var ColorView = require("../views/color/vl_colors");
var AreaView = require("../views/area/vl_area");
var MarcaView = require("../views/marca/vl_marques");
var VehicleView = require("../views/vehicle/vl_vehicles");
var SancioView = require("../views/sancio/vl_sancions");
var TiquetView = require("../views/tiquet/vl_tiquets");
var RevisorView = require("../views/revisor/vl_revisors");
var TiquetUserView = require("../views/tiquetsUsuari/vl_tiquetsUsuari");
var EstacionamentView = require("../views/estacionament/vl_estacionament");

var Ui = {};

var colorList = new CollectionColor ({eventBus: EventBus});
var marcaList = new CollectionMarca ({eventBus: EventBus});
var areaList = new CollectionArea ({eventBus: EventBus});
var tiquetList = new CollectionTiquet ({eventBus: EventBus});
var sancioList = new CollectionSancio ({eventBus: EventBus});
var tiquetsUsuariList = new CollectionTiquetUser ({eventBus: EventBus});
var tiquetsRevisorList = new CollectionRevisor ({eventBus: EventBus});
var vehicleListUser = new CollectionVehicleUser ({eventBus: EventBus});
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
        case 'marques': {
            localStorage.setItem('last', 'marques');
            if (localStorage.hasItem('user')) {
               marcaList.fetch({
                    success: function () {
                        lastContent = new MarcaView({el: $content, eventBus: EventBus, collection: marcaList}).render();
                    },
                    error: Ui.error
                });
            } else
                Ui.switchContent('login');
            break;
        }
        case 'vehicles': {
            localStorage.setItem('last', 'vehicles');
            if (localStorage.hasItem('user')) {
                vehicleList.fetch({
                    success: function () {
                        lastContent = new VehicleView({el: $content, eventBus: EventBus, collection: vehicleList}).render();
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
        case 'tiquetsHist': {
            localStorage.setItem('last', 'tiquetsHist');
            if (localStorage.hasItem('user')) {
                tiquetList.fetch({
                    data: {data: new Date()},
                    processData: true,
                    success: function () {
                        lastContent = new TiquetView({titol: 'Tiquets Històrics', historic: true, el: $content, eventBus: EventBus, collection: tiquetList}).render();
                    },
                    error: Ui.error
                });
            } else
                Ui.switchContent('login');
            break;
        }
        case 'homeUsuari': {
            localStorage.setItem('last', 'homeUsuari');
            if (localStorage.hasItem('user')) {
                tiquetsUsuariList.fetch({
                    data: {dataFi: new Date()},
                    processData: true,
                    success: function () {
                        lastContent = new TiquetUserView({titol: 'Tiquets Actius', el: $content, eventBus: EventBus, collection: tiquetsUsuariList}).render();
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
                $.when(tiquetsUsuariList.fetch({data: {dataFi: new Date()}}), vehicleListUser.fetch(), marcaList.fetch(), areaList.fetch()).then(function () {
                    lastContent = new EstacionamentView({
                        el: $content, eventBus: EventBus, collection: {
                            vehicles: vehicleListUser,
                            colors: colorList,
                            marcas: marcaList,
                            arees: areaList,
                            tiquetsUsuari: tiquetsUsuariList
                        }
                    }).render();
                });
            } else
                Ui.switchContent('login');
            break;
        }
        case 'sancions': {
            localStorage.setItem('last', 'sancio');
            if (localStorage.hasItem('user')) {

                sancioList.fetch({
                    data: {
                        data: new Date()
                    },
                    processData: true,
                    success: function () {
                        lastContent = new SancioView({titol: 'Sancions', el: $content, eventBus: EventBus, collection: sancioList}).render();
                    },
                    error: Ui.error
                });
            } else
                Ui.switchContent('login');
            break;
        }
        case 'revisor': {
            localStorage.setItem('last', 'revisor');
            if (localStorage.hasItem('user')) {
                tiquetsRevisorList.fetch({
                    data: {data: new Date()},
                    processData: true,
                    success: function () {
                        lastContent = new RevisorView({el: $content, collection: tiquetsRevisorList}).render();
                    },
                    error: Ui.error
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
        Ui.switchContent('homeUsuari')
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
EventBus.on('ui:switch:colors', Ui.switchContent.bind(null, 'colors'));
EventBus.on('ui:switch:marques', Ui.switchContent.bind(null, 'marques'));
EventBus.on('ui:switch:arees', Ui.switchContent.bind(null, 'arees'));
EventBus.on('ui:switch:tiquetsDia', Ui.switchContent.bind(null, 'tiquetsDia'));
EventBus.on('ui:switch:tiquetsAct', Ui.switchContent.bind(null, 'tiquetsAct'));
EventBus.on('ui:switch:tiquetsHist', Ui.switchContent.bind(null, 'tiquetsHist'));
EventBus.on('ui:switch:estacionament', Ui.switchContent.bind(null, 'estacionament'));
EventBus.on('ui:switch:homeUsuari', Ui.switchContent.bind(null, 'homeUsuari'));
EventBus.on('ui:switch:sancions', Ui.switchContent.bind(null, 'sancions'));
EventBus.on('ui:switch:vehicles', Ui.switchContent.bind(null, 'vehicles'));
EventBus.on('ui:switch:revisor', Ui.switchContent.bind(null, 'revisor'));


module.exports = Ui;


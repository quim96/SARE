var EventBus = require('../eventBus')
var localStorage = require('../localStorage')
var CollectionOrder = require("../collections/c_orders")
var CollectionColor = require("../collections/c_colors")
var CollectionArea = require("../collections/c_arees")
var UserLogin = require("../views/user/v_login")
var UserSignup = require("../views/user/v_signup")
var HeaderView = require("../views/header")
var OrdersView = require("../views/order/vl_orders")
var ColorView = require("../views/color/vl_colors")
var AreaView = require("../views/area/vl_area")

var Ui = {}

var orderList = new CollectionOrder({eventBus: EventBus})
var colorList = new CollectionColor ({eventBus: EventBus})
var areaList = new CollectionArea ({eventBus: EventBus})

var $content = $('#content')

var lastHeader = null
var lastContent = null

Ui.switchContent = function (widget) {
    if (lastContent) lastContent.undelegateEvents()

    lastHeader = new HeaderView({el: '#header', eventBus: EventBus, user: localStorage.getItem('user')}).render()

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
            console.log("hello");
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
    }
}

Ui.init = function () {
    // headerView.setUserData(localStorage.getItem('user'))
    // Ui.showHome();
};

Ui.showHome = function () {
    if (localStorage.hasItem('user')) {
        Ui.switchContent('orders')
    } else {
        Ui.switchContent('login')
    }
};

Ui.showSignup = function () {
    Ui.switchContent('signup');
};

// This always receive a JSON object with a standard API error
Ui.error = function (err) {
    if (err.message)
        alert("Error: " + err.message);
    else if (err.responseJSON) {
        if (err.responseJSON.message)
            alert("Error: " + err.responseJSON.message);
        else if (err.responseJSON.error)
            alert("Error: " + err.responseJSON.error.message);
    }
};

EventBus.on('ui:showHome', Ui.showHome);
EventBus.on('ui:showError', Ui.error);
EventBus.on('ui:switch:signup', Ui.showSignup);
EventBus.on('ui:switch:orders', Ui.switchContent.bind(null, 'orders'));
EventBus.on('ui:switch:colors', Ui.switchContent.bind(null, 'colors'));
EventBus.on('ui:switch:arees', Ui.switchContent.bind(null, 'arees'));

module.exports = Ui;


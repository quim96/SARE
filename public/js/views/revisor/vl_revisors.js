var tl_revisor = require("raw-loader!../../../templates/revisor/tl_revisor.html");
var Sancio = require('../../models/m_sancio');
var Vehicle = require('../../models/m_vehicle');
var VehicleCollection = require('../../collections/c_vehicles');
var vehicleList;

var RevisorListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_revisor);

        this.localEventBus = _.extend({}, Backbone.Events);
        vehicleList = new VehicleCollection({eventBus: this.localEventBus});
    },

    events: {
        'click #consultar': 'consultar',
        'click #sancio': 'sancionar'
    },
    render: function() {
        this.$el.html(this.template({revisors: this.collection}));
        return this;
    },
    sancionar: function() {

        vehicleList.fetch({
            data: {
                matricula: model.$el.find('#matricula').val()
            }
        }).then(function (vehicleList) {
            if(vehicleList.length == 0){
                var dataVehicle = {
                    matricula: model.$el.find('#matricula').val(),
                };
                var vehicle = new Vehicle();
                vehicle.save(dataVehicle, {
                    success: function (vehicle) {
                        var data = {
                            import: 100,
                            VehicleId: vehicle.id,
                            AreaId: 1,
                            data: new Date()
                        };
                        var sancio = new Sancio();
                        sancio.save(data, {
                            success: function () {
                                console.log('Sanció Posada')
                            }
                        });
                    }

                });
            }
            console.log(vehicleList);
            var data = {
                import: 100,
                VehicleId: vehicleList[0].id,
                AreaId: 1,
                data: new Date()
            };
            var sancio = new Sancio();
            sancio.save(data, {
                success: function () {
                    console.log('Sanció Posada')
                }

            });
        });
    },
    consultar: function () {
        model = this;
        this.collection.fetch(
            {
                data: {
                    matricula: model.$el.find('#matricula').val()
                }
            }).then(function () {
            model.carregarResultats();
        });
        this.$el.find('.trCont').val()
    },
    carregarResultats: function () {
        this.$el.find('#mat').text(this.$el.find('#matricula').val().toString())
        if(this.collection.length == 0) {
            this.$el.find('#resultat').text('No Té Tiquet Actiu');
            this.$el.find('#sancio').removeClass('hidden');

        } else {
            this.$el.find('#resultat').text('Té Tiquet Actiu');
            this.$el.find('#sancio').removeClass('hidden');
        }
    }

});

module.exports = RevisorListView;

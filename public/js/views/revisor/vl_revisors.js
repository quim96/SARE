var tl_revisor = require("raw-loader!../../../templates/revisor/tl_revisor.html");
var Sancio = require('../../models/m_sancio');
var Vehicle = require('../../models/m_vehicle');
var VehicleCollection = require('../../collections/c_vehicles');
var vehicleList;
var zonaIncorrecte = false;
var RevisorListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.template = _.template(tl_revisor);

        this.localEventBus = _.extend({}, Backbone.Events);
        vehicleList = new VehicleCollection({eventBus: this.localEventBus});
        this.eventBus.trigger('tab:change', 'revisor');

    },

    events: {
        'click #consultar': 'consultar',
        'click #sancio': 'sancionarTiquet',
        'click #sancioZonaEquivocada': 'sancionarIncorrecte'
    },
    render: function() {
        this.$el.html(this.template({revisors: this.collection}));
        return this;
    },
    sancionarIncorrecte: function() {
        zonaIncorrecte = true;
        this.sancionar();
    },
    sancionarTiquet: function() {
        zonaIncorrecte = false;
        this.sancionar();
    },
    sancionar: function() {
        var importSancio;
        if (zonaIncorrecte)
            importSancio = 3;
        else
            importSancio = 5.5;
        model = this;
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
                            import: importSancio,
                            VehicleId: vehicle.id,
                            AreaId: 1,
                            data: new Date()
                        };
                        var sancio = new Sancio();
                        sancio.save(data, {
                            success: function () {
                                model.$el.find('#matricula').val('');
                                model.$el.find('#mat').text('');
                                model.$el.find('#resultat').text('');
                                model.$el.find('#sancio').removeClass('hidden');
                            }
                        });
                    }

                });
            }
            var data = {
                import: importSancio,
                VehicleId: vehicleList[0].id,
                AreaId: 1,
                data: new Date()
            };
            var sancio = new Sancio();
            sancio.save(data, {
                success: function () {
                    model.$el.find('#matricula').val('');
                    model.$el.find('#mat').text('');
                    model.$el.find('#resultat').text('');
                    model.$el.find('#sancio').removeClass('hidden');
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
            this.$el.find('#sancioZonaEquivocada').addClass('hidden');

        } else {
            tt = this.collection;
            this.$el.find('#resultat').text('Té Tiquet Actiu (Zona ');
            model = this;
            this.collection.each(function (value) { model.$el.find('#resultat').text(model.$el.find('#resultat').text() + value.get('Area').nom) + ' '});
            this.$el.find('#resultat').text(this.$el.find('#resultat').text() + ')');
            this.$el.find('#sancio').addClass('hidden');
            this.$el.find('#sancioZonaEquivocada').removeClass('hidden');
        }
    }

});

module.exports = RevisorListView;

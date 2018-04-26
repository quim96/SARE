var tl_tiquet = require("raw-loader!../../../templates/estacionament/tl_estacionament.html");

var VehicleItemView = require('./v_vehicleItem');
var ColorItemView = require('./v_colorItem');
var Vehicle = require('../../models/m_vehicle')
var Common = require('../../common');
var TiquetListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.titol = params.titol;
        this.template = _.template(tl_tiquet);

        this.localEventBus = _.extend({}, Backbone.Events);
        this.localEventBus.on('view:vehicle:select', this.showZona.bind(this));
    },

    events: {
        'click #afegirVehicle': 'afegirVehicle',
        'click #cancelar': 'cancelar',
        'click #btnCrear': 'crearEditar',
        'change #colors' : 'updateColor'
    },

    render: function() {
        this.$el.html(this.template({vehicles: this.collection.vehicles}));
        this.eventBus.trigger('tab:change', 'estacionament');

        var localEventBus = this.localEventBus;
        $table = this.$el.find('#taulaVehicle');

        var marques = this.collection.marcas;
        this.collection.vehicles.each(function(item) {
            $table.append(new VehicleItemView({model: item, collection: marques, eventBus: localEventBus}).render().el)
        });
        $table.append('<tr><td class="fz16 centre"><button id="afegirVehicle" class="btn btn-primary">Afegir Vehicle</button></td></tr>');


        return this;
    },
    showZona: function(id) {
        this.$el.find('#step1').removeClass('active').addClass('complete');
        this.$el.find('#step2').addClass('active')//.removeClass('disabled');
    },


    cancelar: function() {
        this.$el.find('#taulaVehicle').removeClass('hidden');
        this.$el.find('#crearEditarVehicle').addClass('hidden');

    },

    afegirVehicle: function () {
        this.$el.find('#matricula').val('');
        this.$el.find('#errorForm').addClass('hidden');
        this.$el.find('#taulaVehicle').addClass('hidden');
        this.$el.find('#crearEditarVehicle').removeClass('hidden');
        $colors = this.$el.find('#colors');
        $colors.find('option').remove().end().append('<option disabled selected value>Color</option>')
        this.collection.colors.fetch({
            success: function (model) {
                model.each(function(item) {
                    $colors.append('<option value="' + item.get("id") + '">' + item.get("nom") + '</option>')
                });
            }});
        $marques = this.$el.find('#marques');
        $marques.find('option').remove().end().append('<option disabled selected value>Marca</option>')
        this.collection.marcas.each(function(item) {
            $marques.append('<option value="' + item.get("id") + '">' + item.get("nom") + '</option>');
        });
    },

    updateColor: function(event) {
        var color = event.target.value;
        console.log(event.target.value); // print 'paypal' or 'check'.
    },

    crearEditar: function () {
        $btnCrear = this.$el.find('#btnCrear');
        $btnCrear.attr('disabled', true);
        if (!$marques.val() || !$colors.val() || !this.$el.find('#matricula').val()) {
            this.$el.find('#errorForm').removeClass('hidden');
            $btnCrear.attr('disabled', false);
        }
        else {
            this.$el.find('#errorForm').addClass('hidden');
            var data = {
                nom: null,
                ColorId: $colors.val(),
                MarcaId: $marques.val(),
                matricula: this.$el.find('#matricula').val()
            };
            var vehicle = new Vehicle();
            var model = this;
            vehicle.save(data, {
                success: function (vehicle) {
                    model.addVehicle(vehicle);
                    $btnCrear.attr('disabled', false);
                },
                error: function (vehicle) {
                    model.addVehicle(vehicle);
                    $btnCrear.attr('disabled', true);
                }
            });
        }
    },

    addVehicle: function(item) {
        console.log(item);
        this.collection.vehicles.add(item);
        this.render();
    },

});

module.exports = TiquetListView;

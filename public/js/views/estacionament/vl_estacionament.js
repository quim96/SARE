var tl_tiquet = require("raw-loader!../../../templates/estacionament/tl_estacionament.html");

var Vehicle = require('../../models/m_vehicle');
var VehicleItemView = require('./v_vehicleItem');

var AreaItemView = require('./v_areaItem');
require('../../module/rellotge');
var rellotge = false;
var $table;
var $tableArea;

var idVehicle;
var idArea;
var temps;

var TiquetListView = Backbone.View.extend({
    initialize: function(params) {
        this.eventBus = params.eventBus;
        this.titol = params.titol;
        this.template = _.template(tl_tiquet);

        this.localEventBus = _.extend({}, Backbone.Events);
        this.localEventBus.on('view:vehicle:select', this.showArea.bind(this));
        this.localEventBus.on('view:area:select', this.showDurada.bind(this));

    },

    events: {
        'click #afegirVehicle': 'afegirVehicle',
        'click #step1': 'showVehicles',
        'click #step2': 'showArea',
        'click #step3': 'showDurada',
        'click #cancelar': 'cancelar',
        'click #btnCrear': 'crearEditar',
        'change #colors' : 'updateColor'
    },

    render: function() {

        this.$el.html(this.template());


        this.eventBus.trigger('tab:change', 'estacionament');

        var localEventBus = this.localEventBus;
        $table = this.$el.find('#taulaVehicle');
        $tableArea = this.$el.find('#taulaArea');
        $rellotge = this.$el.find('#divRellotge');


        var marques = this.collection.marcas;
        this.collection.vehicles.each(function(item) {
            $table.append(new VehicleItemView({model: item, collection: marques, eventBus: localEventBus}).render().el)
        });
        $table.append('<tr><td class="fz16 centre"><button id="afegirVehicle" class="btn btn-primary">Afegir Vehicle</button></td></tr>');


        this.collection.arees.each(function(item) {
            $tableArea.append(new AreaItemView({model: item, eventBus: localEventBus}).render().el)
        });

        return this;
    },
    showVehicles: function() {
        this.$el.find('.pas').removeClass('active complete disabled punter');
        this.$el.find('#step1').addClass('active');
        this.$el.find('#step2').addClass('disabled');
        this.$el.find('#step3').addClass('disabled');
        this.$el.find('#step4').addClass('disabled');

        this.$el.find('.step').addClass('hidden');
        $rellotge.addClass('hidden');
        $tableArea.addClass('hidden');
        $table.removeClass('hidden');
    },

    showArea: function(id) {
        if(Number.isInteger(id))
            idVehicle = id;
        else if(!this.$el.find('#step2').hasClass('punter')){
            return;
        }
        this.$el.find('.pas').removeClass('active complete disabled punter');
        this.$el.find('#step1').addClass('complete punter');
        this.$el.find('#step2').addClass('active');
        this.$el.find('#step3').addClass('disabled');
        this.$el.find('#step4').addClass('disabled');


        $table.addClass('hidden');
        $rellotge.addClass('hidden');
        $tableArea.removeClass('hidden');
    },
    showDurada: function(id) {
        console.log(Number.isInteger(id));
        if(Number.isInteger(id)) {
            if (Number.isInteger(idArea)) {
                this.$el.find('#rellotge').remove();
                this.$el.find('#divRellotge').append('<div id="rellotge"></div>')
            }
            idArea = id;
        }
        else if(!this.$el.find('#step3').hasClass('punter')){
            return;
        }
        this.$el.find('.pas').removeClass('active complete disabled punter');
        this.$el.find('#step1').addClass('complete punter');
        this.$el.find('#step2').addClass('complete punter');
        this.$el.find('#step3').addClass('active');
        this.$el.find('#step4').addClass('disabled');
        $table.addClass('hidden');
        $tableArea.addClass('hidden');

        console.log(this.$el.find('#rellotge'));

        this.$el.find('#rellotge').clockpicker({minuts: this.collection.arees.get(idArea).get('maxMinuts'), franges: 5});

        this.$el.find('#rellotge').removeClass('hidden');
    },
    cancelar: function() {
        $table.removeClass('hidden');
        this.$el.find('#crearEditarVehicle').addClass('hidden');

    },

    afegirVehicle: function () {
        this.$el.find('#matricula').val('');
        this.$el.find('.step').addClass('hidden');
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

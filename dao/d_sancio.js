/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Sancio = {};

    Sancio.getById = function (id, t) {
        return db.Sancio.find(util.addTrans(t, {where: {id: id}}))
            .then(function(sancio) {
                if (!sancio) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Sancio with id: ' + id)
                else return sancio
            })
    };
    Sancio.getAllSancios = function () {
        return db.Sancio.findAll();
    };
    Sancio.getByData = function (data) {
        var d1 = new Date(new Date(data).setUTCHours(0,0,0,0));
        var d2 = new Date(new Date(data).setUTCHours(23,59,59,59));
        return db.Sancio.findAll({
            include: [
                { model: db.Vehicle, attributes:["matricula"], include: [{model: db.Marca, attributes:["nom"] }, {model: db.Color, attributes:["nom"] } ] },
                { model: db.Area, attributes: ["nom"] }
            ],
            where: {
                data: {
                    $between: [d1, d2]
                }
            }
        });
    };

    Sancio.create = function (sancio_data, user, t) {
        return db.Sancio.create(sancio_data, util.addTrans(t, {}))
    };
    Sancio.update = function (sancio_data, user, t) {
        return db.Sancio.update(sancio_data, { where: {id: sancio_data.id} }, util.addTrans(t, {}))
    };
    Sancio.delete = function (id, t) {
        return db.Sancio.destroy(util.addTrans(t, {where: {id: id}}));
    };

    return Sancio;
};
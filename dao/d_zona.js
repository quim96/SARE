/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Zona = {};

    Zona.getById = function (id, t) {
        return db.Zona.find(util.addTrans(t, {where: {id: id}}))
            .then(function(zona) {
                if (!zona) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Zona with id: ' + id)
                else return zona
            })
    };
    Zona.getAllZonas = function () {
        return db.Zona.findAll({
            order: [['nom', 'ASC']]
        });
    };

    Zona.create = function (zona_data, user, t) {
        return db.Zona.create(zona_data, util.addTrans(t, {}))
    };
    Zona.update = function (zona_data, user, t) {
        return db.Zona.update(zona_data, { where: {id: zona_data.id} }, util.addTrans(t, {}))
    };
    Zona.delete = function (id, t) {
        return db.Zona.destroy(util.addTrans(t, {where: {id: id}}));
    };

    return Zona;
};
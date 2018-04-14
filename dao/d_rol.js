/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Rol = {};

    Rol.getById = function (id, t) {
        return db.Rol.find(util.addTrans(t, {where: {id: id}}))
            .then(function(rol) {
                if (!rol) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Rol with id: ' + id)
                else return rol
            })
    };
    Rol.getAllRols = function () {
        return db.Rol.findAll({
            order: [['nom', 'ASC']]
        });
    };

    Rol.create = function (rol_data, user, t) {
        return db.Rol.create(rol_data, util.addTrans(t, {}))
    };
    Rol.update = function (rol_data, user, t) {
        return db.Rol.update(rol_data, { where: {id: rol_data.id} }, util.addTrans(t, {}))
    };
    Rol.delete = function (id, t) {
        return db.Rol.destroy(util.addTrans(t, {where: {id: id}}));
    };

    return Rol;
};
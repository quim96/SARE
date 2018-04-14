/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Marca = {};

    Marca.getById = function (id, t) {
        return db.Marca.find(util.addTrans(t, {where: {id: id}}))
            .then(function(marca) {
                if (!marca) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Marca with id: ' + id)
                else return marca
            })
    };
    Marca.getAllMarcas = function () {
        return db.Marca.findAll({
            order: [['nom', 'ASC']]
        });
    };

    Marca.create = function (marca_data, user, t) {
        return db.Marca.create(marca_data, util.addTrans(t, {}))
    };
    Marca.update = function (marca_data, user, t) {
        return db.Marca.update(marca_data, { where: {id: marca_data.id} }, util.addTrans(t, {}))
    };
    Marca.delete = function (id, t) {
        return db.Marca.destroy(util.addTrans(t, {where: {id: id}}));
    };

    return Marca;
};
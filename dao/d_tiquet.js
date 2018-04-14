/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Tiquet = {};

    Tiquet.getById = function (id, t) {
        return db.Tiquet.find(util.addTrans(t, {where: {id: id}}))
            .then(function(tiquet) {
                if (!tiquet) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Tiquet with id: ' + id)
                else return tiquet
            })
    };
    Tiquet.getAllTiquets = function () {
        return db.Tiquet.findAll({
            order: [['nom', 'ASC']]
        });
    };

    Tiquet.create = function (tiquet_data, user, t) {
        return db.Tiquet.create(tiquet_data, util.addTrans(t, {}))
    };
    Tiquet.update = function (tiquet_data, user, t) {
        return db.Tiquet.update(tiquet_data, { where: {id: tiquet_data.id} }, util.addTrans(t, {}))
    };
    Tiquet.delete = function (id, t) {
        return db.Tiquet.destroy(util.addTrans(t, {where: {id: id}}));
    };

    return Tiquet;
};
/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Matricula = {};

    Matricula.getById = function (id, t) {
        return db.Matricula.find(util.addTrans(t, {where: {id: id}}))
            .then(function(matricula) {
                if (!matricula) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Matricula with id: ' + id)
                else return matricula
            })
    };
    Matricula.getAllMatriculas = function () {
        return db.Matricula.findAll({
            order: [['nom', 'ASC']]
        });
    };

    Matricula.create = function (matricula_data, user, t) {
        return db.Matricula.create(matricula_data, util.addTrans(t, {}))
    };
    Matricula.update = function (matricula_data, user, t) {
        return db.Matricula.update(matricula_data, { where: {id: matricula_data.id} }, util.addTrans(t, {}))
    };
    Matricula.delete = function (id, t) {
        return db.Matricula.destroy(util.addTrans(t, {where: {id: id}}));
    };

    return Matricula;
};
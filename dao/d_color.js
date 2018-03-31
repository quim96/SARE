/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Color = {};

    Color.getById = function (id, t) {
        return db.Color.find(util.addTrans(t, {where: {id: id}}))
            .then(function(color) {
                if (!color) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Color with id: ' + id)
                else return color
            })
    };
    Color.getAllColors = function () {
        return dao.Color.findAll({
            order: ['nom', 'DESC']
        });
    };

    Color.create = function (color_data, user, t) {
        return db.Color.create(color_data, util.addTrans(t, {}))
    };

    return Color;
};
/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Area = {};

    Area.getById = function (id, t) {
        return db.Area.find(util.addTrans(t, {where: {id: id}}))
            .then(function(area) {
                if (!area) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Area with id: ' + id)
                else return area
            })
    };
    Area.getAllAreas = function () {
        return db.Area.findAll({
            order: [['nom', 'ASC']]
        });
    };

    Area.create = function (area_data, user, t) {
        return db.Area.create(area_data, util.addTrans(t, {}))
    };
    Area.update = function (area_data, user, t) {
        return db.Area.update(area_data, { where: {id: area_data.id} }, util.addTrans(t, {}))
    };
    Area.delete = function (id, t) {
        return db.Area.destroy(util.addTrans(t, {where: {id: id}}));
    };

    return Area;
};
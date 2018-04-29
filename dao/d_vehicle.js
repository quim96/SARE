/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Vehicle = {};

    Vehicle.getById = function (id, t) {
        return db.Vehicle.find(util.addTrans(t, {where: {id: id}}))
            .then(function(vehicle) {
                if (!vehicle) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Vehicle with id: ' + id)
                else return vehicle
            })
    };
    Vehicle.getAllVehicles = function () {
        return db.Vehicle.findAll({
            order: [['nom', 'ASC']]
        });
    };

    Vehicle.create = function (vehicle_data, user, t) {
        return db.Vehicle.create(vehicle_data, util.addTrans(t, {}))
            .then(function(vehicle) {
                if (user.RolId === 2)
                    return vehicle.setUser(user, util.addTrans(t, {}));
                else
                    return vehicle;
            });
    };

    Vehicle.update = function (vehicle_data, user, t) {
        return db.Vehicle.update(vehicle_data, { where: {id: vehicle_data.id} }, util.addTrans(t, {}))
    };
    Vehicle.delete = function (id, t) {
        return db.Vehicle.destroy(util.addTrans(t, {where: {id: id}}));
    };

    Vehicle.getUserVehicles = function (userId, options, t) {
        var opt = options || {};
        return dao.User.getById(userId, t)
            .then(function(user) {
                if (!user) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no User with id: ' + userId);
                return user.getVehicles({});
            })
    };
    return Vehicle;
};
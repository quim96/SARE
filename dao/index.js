/**
 * New node file
 */

module.exports = function (app) {
    var dao = {};

    dao.User = require('./d_user')(app, dao);
    dao.Color = require('./d_color')(app, dao);
    dao.Marca = require('./d_marca')(app, dao);
    dao.Area = require('./d_area')(app, dao);
    dao.Rol = require('./d_rol')(app, dao);
    dao.Sancio = require('./d_sancio')(app, dao);
    dao.Tiquet = require('./d_tiquet')(app, dao);
    dao.Vehicle = require('./d_vehicle')(app, dao);
    return dao;
}
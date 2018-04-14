/**
 * New node file
 */

module.exports = function (app) {
    var dao = {};

    dao.User = require('./d_user')(app, dao);
    dao.Order = require('./d_order')(app, dao);
    dao.Color = require('./d_color')(app, dao);
    dao.Marca = require('./d_color')(app, dao);
    dao.Matricula = require('./d_color')(app, dao);
    dao.Rol = require('./d_color')(app, dao);
    dao.Sancio = require('./d_color')(app, dao);
    dao.Tiquet = require('./d_color')(app, dao);
    dao.Vehicle = require('./d_color')(app, dao);

    return dao;
}
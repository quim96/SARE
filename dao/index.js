/**
 * New node file
 */

module.exports = function (app) {
    var dao = {};

    dao.User = require('./d_user')(app, dao);
    dao.Order = require('./d_order')(app, dao);
    dao.Color = require('./d_color')(app, dao);
    dao.Marca = require('./d_marca')(app, dao);
    dao.Matricula = require('./d_matricula')(app, dao);
    dao.Rol = require('./d_rol')(app, dao);
    dao.Sancio = require('./d_sancio')(app, dao);
    dao.Tiquet = require('./d_tiquet')(app, dao);
    dao.Vehicle = require('./d_vehicle')(app, dao);
    dao.Zona = require('./d_zona')(app, dao);
    return dao;
}
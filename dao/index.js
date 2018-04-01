/**
 * New node file
 */

module.exports = function (app) {
    var dao = {};

    dao.User = require('./d_user')(app, dao);
    dao.Order = require('./d_order')(app, dao);
    dao.Color = require('./d_color')(app, dao);

    return dao;
}
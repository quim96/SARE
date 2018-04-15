module.exports = function (app) {

    var P = app.Promise;
    var db = app.db;

    var util = require('../util');
    var dao = require('../dao')(app);

    return {
        create: function (req, res) {
            util.checkParams(req.body, ['nom']);

            db.sequelize.transaction(function (t) {
                return dao.User.getById(req.session.userId, t)
                    .then(function (user) {
                        if (!user) util.sendError(400, util.Error.ERR_ENTITY_NOT_FOUND, "User from session does not exist");
                        else return dao.Area.create(req.body, user, t);
                    })
            })
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        edit: function (req, res) {
            util.checkParams(req.body, ['nom']);
            util.checkParams(req.body, ['id']);

            db.sequelize.transaction(function (t) {
                return dao.User.getById(req.session.userId, t)
                    .then(function (user) {
                        if (!user) util.sendError(400, util.Error.ERR_ENTITY_NOT_FOUND, "User from session does not exist");
                        else {
                            return dao.Area.update(req.body, user, t).then(function(item) {
                                return req.body;
                            })
                        }
                    })
            })
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        esborrar: function (req, res) {
            util.checkParams(req.params, ['id']);

            dao.Area.delete(req.params.id)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        getAll: function (req, res) {
            dao.Area.getAllAreas()
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        getById: function (req, res) {
            util.checkParams(req.params, ['id']);

            dao.Area.getById(req.params.id)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        }

    }
};

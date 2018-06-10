module.exports = function (app) {

    var P = app.Promise;
    var db = app.db;

    var util = require('../util');
    var dao = require('../dao')(app);

    return {
        create: function (req, res) {
            db.sequelize.transaction(function (t) {
                return dao.User.getById(req.session.userId, t)
                    .then(function (user) {
                        if (!user) util.sendError(400, util.Error.ERR_ENTITY_NOT_FOUND, "User from session does not exist");
                        else return dao.Vehicle.create(req.body, user, t);
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
                            return dao.Vehicle.update(req.body, user, t).then(function(item) {
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

            dao.Vehicle.delete(req.params.id)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        getAll: function (req, res) {
            if(util.containsParam(req.query, ['matricula'])){
                dao.Vehicle.getByMatricula(req.query.matricula)
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
            } else {
                dao.Vehicle.getAllVehicles()
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
            }
        },
        getById: function (req, res) {
            util.checkParams(req.params, ['id']);

            dao.Vehicle.getById(req.params.id)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },

        getVehicles: function (req, res) {
            dao.Vehicle.getUserVehicles(req.session.userId, {})
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        }


    }
};

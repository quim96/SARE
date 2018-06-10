module.exports = function (app) {

    var P = app.Promise;
    var db = app.db;

    var util = require('../util');
    var dao = require('../dao')(app);

    return {
        create: function (req, res) {
            util.checkParams(req.body, ['import', 'VehicleId', 'AreaId']);

            db.sequelize.transaction(function (t) {
                return dao.User.getById(req.session.userId, t)
                    .then(function (user) {
                        if (!user) util.sendError(400, util.Error.ERR_ENTITY_NOT_FOUND, "User from session does not exist");
                        else return dao.Tiquet.create(req.body, user, t);
                    })
            })
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        edit: function (req, res) {
            util.checkParams(req.body, ['id']);

            db.sequelize.transaction(function (t) {
                return dao.User.getById(req.session.userId, t)
                    .then(function (user) {
                        if (!user) util.sendError(400, util.Error.ERR_ENTITY_NOT_FOUND, "User from session does not exist");
                        else {
                            return dao.Tiquet.update(req.body, user, t).then(function() {
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

            dao.Tiquet.delete(req.params.id)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        getAll: function (req, res) {
            if(util.containsParam(req.query, ['data'])){
                dao.Tiquet.getByData(req.query.data)
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
            } else if(util.containsParam(req.query, ['dataInici', 'dataFi'])){
                dao.Tiquet.getByDataIniFi(req.query.dataInici, req.query.dataFi)
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
            } else if(util.containsParam(req.query, ['dataFi'])){
                dao.Tiquet.getByDataFi(req.query.dataFi)
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
            } else {
                dao.Tiquet.getAllTiquets()
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
            }
        },
        getTiquetsUsuari: function (req, res) {
                dao.Tiquet.getUserTiquetsData(req.session.userId, req.query.dataFi)
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
        },
        getById: function (req, res) {
            util.checkParams(req.params, ['id']);
            dao.Tiquet.getById(req.params.id)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        getByData: function (req, res) {
            dao.Tiquet.getByData(req.params.data)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        }

    }
};

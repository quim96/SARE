module.exports = function (app) {

    var P = app.Promise;
    var db = app.db;

    var util = require('../util');
    var dao = require('../dao')(app);

    return {
        create: function (req, res) {
            util.checkParams(req.body, ['VehicleId', 'AreaId']);

            db.sequelize.transaction(function (t) {
                return dao.User.getById(req.session.userId, t)
                    .then(function (user) {
                        if (!user) util.sendError(400, util.Error.ERR_ENTITY_NOT_FOUND, "User from session does not exist");
                        else return dao.Sancio.create(req.body, user, t);
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
                            return dao.Sancio.update(req.body, user, t).then(function() {
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

            dao.Sancio.delete(req.params.id)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        getAll: function (req, res) {
            if(util.containsParam(req.query, ['dataInici', 'dataFi'])){
                dao.Sancio.getByDataIniFi(req.query.dataInici, req.query.dataFi )
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
            }
            else if(!util.containsParam(req.query, ['data'])) {
                dao.Sancio.getAllSancios()
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
            } else {
                dao.Sancio.getByData(req.query.data)
                    .then(util.jsonResponse.bind(util, res))
                    .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                    .done();
            }
        },
        getSanciosUsuari: function (req, res) {
            dao.Sancio.getUserSanciosData(req.session.userId, req.query.dataFi)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },

        getByData: function (req, res) {
            dao.Sancio.getByData(req.params.data)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        }

    }
};

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
                        else return dao.Color.create(req.body, user, t);
                    })
            })
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        getAll: function (req, res) {
            dao.Color.getAllColors()
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        },
        getById: function (req, res) {
            util.checkParams(req.params, ['id']);

            dao.Color.getById(req.params.id)
                .then(util.jsonResponse.bind(util, res))
                .catch(util.sendError.bind(util, res, 400, util.Error.ERR_BAD_REQUEST))
                .done();
        }

    }
};

var util = {}

util.llistaAct = [];

util.jsonResponse = function (res, obj) {
    res.status(200).json(obj || {message: 'ok'});
};

util.throwError = function (code, type, reason, prevErr) {
    console.log("Throwing error ...");
    var err =  prevErr ? new Error(reason + ' (' + prevErr.message + ')') : new Error(reason);
    err.type = type;
    err.code = code;
    throw err;
}

util.sendError = function (res, code, type, err) {
    var json = {};
    json.type = type || error.ERR_UNKNOWN;
    json.message = err.message || err || "Unknown error";
    res.status(code || 500).json({ error: json });
}

util.addTrans = function (t, obj) {
    if (!t) return obj;
    else {
        obj.transaction = t;
        return obj;
    }
}

util.checkParams = function (obj, params) {
    if (!obj) util.throwError(400, error.ERR_BAD_REQUEST, "No body found in request");
    for (var i = 0; i < params.length; i++) {
        if (!obj.hasOwnProperty(params[i])) {
            util.throwError(400, error.ERR_MISSING_PARAMETER, "Missing parameter (" + params[i] + ") in request");
        }
    }
};

util.containsParam = function (obj, params) {
    if (!obj) util.throwError(400, error.ERR_BAD_REQUEST, "No body found in request");
    for (var i = 0; i < params.length; i++) {
        if (!obj.hasOwnProperty(params[i])) {
            return false;
        }
    }
    return true;
};


var error = {
    ERR_MISSING_PARAMETER: 'ERR_MISSING_PARAMETER',
    ERR_AUTHENTICATION: 'ERR_AUTHENTICATION',
    ERR_ENTITY_NOT_FOUND: 'ERR_ENTITY_NOT_FOUND',
    ERR_ENTITY_EXISTS: 'ERR_ENTITY_EXISTS',
    ERR_TRANSACTION: 'ERR_DB_TRANSACTION',
    ERR_UNKNOWN: 'ERR_UNKNOWN',
    ERR_BAD_REQUEST: 'ERR_BAD_REQUEST'

}

util.Error = error;


util.isAuthenticated = function(req, res, next) {
    if (req.session.userId) next()
    else util.sendError(res, 400, error.ERR_AUTHENTICATION, new Error('User is not logged in'))
};

util.isAdmin = function(req, res, next) {
    if (util.llistaAct.indexOf(req.session.userId) !== -1){ //Permet veure si l'usuari té alguna actualització pendent
        util.llistaAct.splice(util.llistaAct.indexOf(req.session.userId), 1);
        delete req.session.userId;
        delete req.session.username;
        delete req.session.rol;
        util.sendError(res, 403, error.ERR_AUTHENTICATION, new Error('Admin: Forbidden response for this User'))
    } else if (req.session.rol === 1) next()
    else util.sendError(res, 403, error.ERR_AUTHENTICATION, new Error('Admin: Forbidden response for this User'))
};

util.isRevisor = function(req, res, next) {
    if (req.session.rol === 2) next()
    else util.sendError(res, 403, error.ERR_AUTHENTICATION, new Error('Revisor: Forbidden response for this User'))
};

util.isNotAuthenticated = function(req, res, next) {
    if (req.session.userId) util.sendError(res, 400, error.ERR_AUTHENTICATION, new Error('User is already authenticated'))
    else next()
};

module.exports = util;


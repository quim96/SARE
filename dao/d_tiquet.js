/**
 * New node file
 */

module.exports = function (app, dao) {
    var util = require('../util');
    var db = app.db;
    var P = app.Promise;
    var Tiquet = {};

    Tiquet.getById = function (id, t) {
        return db.Tiquet.find(util.addTrans(t, {where: {id: id}}))
            .then(function(tiquet) {
                if (!tiquet) util.throwError(400, util.Error.ERR_ENTITY_NOT_FOUND, 'There is no Tiquet with id: ' + id)
                else return tiquet
            })
    };
    Tiquet.getByDataIniFi = function(dataIn, dataFi) {
        d1 = new Date(dataIn);
        d2 = new Date(dataFi);
        return db.Tiquet.findAll({
            include: [
                { model: db.Vehicle, attributes:["matricula"], include: [{model: db.Marca, attributes:["nom"] }, {model: db.Color, attributes:["nom"] } ] },
                { model: db.Area, attributes: ["nom"] }
            ],
            where: {
                $or: {
                    dataInici: {
                        $between: [d1, d2]
                    },
                    dataFi: {
                        $between: [d1, d2]
                    }
                }
            }
        })
    };
    Tiquet.getByDataFi = function(dataFi) {
        return db.Tiquet.findAll({
            include: [
                { model: db.Vehicle, attributes:["matricula"], include: [{model: db.Marca, attributes:["nom"] }, {model: db.Color, attributes:["nom"] } ] },
                { model: db.Area, attributes: ["nom"] }
            ],
            where: {
                dataFi: {
                    $gte: new Date(dataFi)
                }
            }
        })
    };
    Tiquet.getByData = function (data) {
        var d1 = new Date(new Date(data).setUTCHours(0,0,0,0));
        var d2 = new Date(new Date(data).setUTCHours(23,59,59,59));
        return db.Tiquet.findAll({
            include: [
                { model: db.Vehicle, attributes:["matricula"], include: [{model: db.Marca, attributes:["nom"] }, {model: db.Color, attributes:["nom"] } ] },
                { model: db.Area, attributes: ["nom"] }
            ],
            where: {
                $or: {
                    dataInici: {
                        $between: [d1, d2]
                    },
                    dataFi: {
                        $between: [d1, d2]
                    }
                }
            }
        })
    };
    Tiquet.getAllTiquets = function () {
        return db.Tiquet.findAll({
            order: [['dataInici', 'ASC']]
        });
    };

    Tiquet.getUserTiquets = function (userId, options, t) {
        var opt = options || {};
        return db.Tiquet.findAll({
            include: [
                { model: db.Vehicle, attributes:["matricula"], where: {UserId: userId}, include: [{model: db.Marca, attributes:["nom"] }, {model: db.Color, attributes:["nom"] } ] },
                { model: db.Area, attributes: ["nom"] }
            ],
            attributes:["import", "dataInici", "dataFi"]
        })
    };

    Tiquet.getUserTiquetsData = function (userId, dataFi, options, t) {
        var opt = options || {};
        if (dataFi) {
            return db.Tiquet.findAll({
                include: [
                    {
                        model: db.Vehicle,
                        attributes: ["matricula"],
                        where: {UserId: userId},
                        include: [{model: db.Marca, attributes: ["nom"]}, {model: db.Color, attributes: ["nom"]}]
                    },
                    {model: db.Area, attributes: ["nom"]}
                ],
                attributes: ["import", "dataInici", "dataFi"],
                where: {
                    dataFi: {
                        $gte: new Date(dataFi)
                    }
                }
            })
        } else {
            return db.Tiquet.findAll({
                include: [
                    {
                        model: db.Vehicle,
                        attributes: ["matricula"],
                        where: {UserId: userId},
                        include: [{model: db.Marca, attributes: ["nom"]}, {model: db.Color, attributes: ["nom"]}]
                    },
                    {model: db.Area, attributes: ["nom"]}
                ],
                attributes: ["import", "dataInici", "dataFi"]
            })
        }
    };

    Tiquet.create = function (tiquet_data, user, t) {
        var result = db.Area.find(util.addTrans(t, {where: {id: tiquet_data.AreaId}}))
            .then(function(area) {
                var minuts = tiquet_data.import / area.preuMinut;
                if (minuts > area.maxMinuts){
                    minuts = area.maxMinuts;
                }
                tiquet_data.dataInici = new Date();
                tiquet_data.dataFi = new Date(tiquet_data.dataInici.getTime() + minuts * 60000);
                return db.Tiquet.create(tiquet_data, util.addTrans(t, {}));
            });
        return result;
    };
    Tiquet.update = function (tiquet_data, user, t) {
        return db.Tiquet.update(tiquet_data, { where: {id: tiquet_data.id} }, util.addTrans(t, {}))
    };
    Tiquet.delete = function (id, t) {
        return db.Tiquet.destroy(util.addTrans(t, {where: {id: id}}));
    };

    return Tiquet;
};
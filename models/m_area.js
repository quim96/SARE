/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
    var Area = sequelize.define('Area', {
        nom : DataTypes.STRING(1024),
        preuMinut: DataTypes.FLOAT,
        maxMinuts: DataTypes.FLOAT
    }, {
        classMethods : {

        }
    });

    return Area;
};
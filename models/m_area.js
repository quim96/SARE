/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
    var Area = sequelize.define('Area', {
        nom : DataTypes.STRING(1024),
        preuMinut: DataTypes.INTEGER,
        maxMinuts: DataTypes.INTEGER
    }, {
        classMethods : {

        }
    });

    return Area;
};
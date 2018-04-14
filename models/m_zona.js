/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
    var Zona = sequelize.define('Zona', {
        nom : DataTypes.STRING(100),

    }, {
        classMethods : {

        }
    });

    return Zona;
};
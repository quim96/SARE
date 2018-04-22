/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
    var Tiquet = sequelize.define('Tiquet', {
        import : DataTypes.FLOAT,
        dataInici : {
            type: DataTypes.DATE
        },
        dataFi : {
            type: DataTypes.DATE
        }
    }, {
        classMethods : {
            associate : function(models) {
                Tiquet.belongsTo(models.Vehicle);
                Tiquet.belongsTo(models.Area)
            }
        }
    });

    return Tiquet;
};
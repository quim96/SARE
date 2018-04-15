/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
    var Tiquet = sequelize.define('Tiquet', {
        import : DataTypes.INTEGER,
        dataInici : {
            type: DataTypes.DATE
        },
        dataFi : {
            type: DataTypes.DATE
        }
    }, {
        classMethods : {
            associate : function(models) {
                Tiquet.belongsTo(models.Matricula);
                Tiquet.belongsTo(models.Zona)
            }
        }
    });

    return Tiquet;
};
/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Sancio = sequelize.define('Sancio', {
        import : DataTypes.FLOAT,
        data : {
            type: DataTypes.DATE
        }
    }, {
        classMethods : {
            associate : function(models) {
                Sancio.belongsTo(models.Vehicle);
                Sancio.belongsTo(models.Area)
            }
        }
	});

	return Sancio;
};
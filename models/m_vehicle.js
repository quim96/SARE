/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Vehicle = sequelize.define('Vehicle', {
		nom : DataTypes.STRING(1024),
		matricula: DataTypes.STRING(100)

	}, {
		classMethods : {
            associate : function(models) {
                Vehicle.belongsTo(models.Color)
            },
            associate : function(models) {
                Vehicle.belongsTo(models.Matricula)
            },
            associate : function(models) {
                Vehicle.belongsTo(models.User)
            }

		}
	});

	return Vehicle;
};
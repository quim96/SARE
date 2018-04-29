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
                Vehicle.belongsTo(models.Color);
                Vehicle.belongsTo(models.User);
                Vehicle.belongsTo(models.Marca)
            }
		}
	});

	return Vehicle;
};
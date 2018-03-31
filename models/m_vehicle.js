/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Vehicle = sequelize.define('Vehicle', {
		nom : DataTypes.STRING(1024)
	}, {
		classMethods : {

		}
	});

	return Vehicle;
};
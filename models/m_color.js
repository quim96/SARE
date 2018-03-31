/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Color = sequelize.define('Color', {
		nom : DataTypes.STRING(1024)
	}, {
		classMethods : {

		}
	});

	return Color;
};
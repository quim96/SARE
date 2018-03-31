/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Marca = sequelize.define('Marca', {
		nom : DataTypes.STRING(1024)
	}, {
		classMethods : {

		}
	});

	return Marca;
};
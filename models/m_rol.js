/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {

	var Rol = sequelize.define('Rol', {
		nom : DataTypes.STRING(255),
	}, {
		classMethods : {

		}
	});

	return Rol;
};
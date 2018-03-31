/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Matricula = sequelize.define('Matricula', {
		nom : DataTypes.STRING(1024)
	}, {
		classMethods : {

		}
	});

	return Matricula;
};
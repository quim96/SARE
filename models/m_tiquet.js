/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {
	var Tiquet = sequelize.define('Tiquet', {
		import : DataTypes.STRING(1024),
		dataInici : {
			type: DataTypes.DATE
		},
        dataFi : {
            type: DataTypes.DATE
        }
	}, {
		classMethods : {

		}
	});

	return Tiquet;
};
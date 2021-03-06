/**
 * New node file
 */

module.exports = function(sequelize, DataTypes) {

    var User = sequelize.define('User', {
        name : DataTypes.STRING(255),
        email : DataTypes.STRING(255),
        username : DataTypes.STRING(45),
        password : DataTypes.STRING(100),
    }, {
        classMethods : {
            associate : function(models) {
                User.belongsTo(models.Rol);
                User.hasMany(models.Order);
                User.hasMany(models.Vehicle);
            }
        }
    });

    return User;
};
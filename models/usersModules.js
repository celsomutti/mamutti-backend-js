'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsersModules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.users, { foreignKey: 'usersId' });
    }
  }
  UserType.init({
    usersId: DataTypes.INTEGER,
    userAccessModulesId: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'usersModules',
  });
  return UsersModules;
};
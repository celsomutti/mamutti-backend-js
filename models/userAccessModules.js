'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class userAccessModules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.usersModules, { foreignKey: 'userAccessModulesId' });
    }
  }
  userAccessModules.init({
    moduleName: DataTypes.STRING,
    moduleDescription: DataTypes.STRING,
    moduleImageName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'userAccessModules',
  });
  return userAccessModules;
};
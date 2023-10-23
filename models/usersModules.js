'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usersModules extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.users, { foreignKey: 'usersId' });
      this.belongsTo(models.userAccessModules, { foreignKey: 'userAccessModulesId' });
    }
  }
  usersModules.init({
    usersId: DataTypes.INTEGER,
    userAccessModulesId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'usersModules',
  });
  return usersModules;
};
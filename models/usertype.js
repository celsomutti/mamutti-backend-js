'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserType extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasOne(models.users, { foreignKey: 'userType' });
    }
  }
  UserType.init({
    description: DataTypes.STRING,
    level: DataTypes.INTEGER,
    onlyMaster: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'usertypes',
  });
  return UserType;
};
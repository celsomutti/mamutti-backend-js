'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    userFullName: DataTypes.STRING,
    userLogin: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    userType: DataTypes.INTEGER,
    userTypeId: DataTypes.INTEGER,
    userStatus: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
'use strict';

const bcrypt = require('bcrypt');

const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    static associate(models) {
      this.belongsTo(models.usertypes, { foreignKey: 'userType' });
    }
  }
  Users.init({
    userFullName: DataTypes.STRING,
    userLogin: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    userTypeId: DataTypes.INTEGER,
    userStatus: DataTypes.BOOLEAN
  }, {
    hooks: {
      beforeCreate: async function(user) {
        const salt = await bcrypt.genSalt(10); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
      },
      beforeUpdate: async function(user) {
        const salt = await bcrypt.genSalt(10); //whatever number you want
        user.password = await bcrypt.hash(user.password, salt);
      } 
    },
    sequelize,
    modelName: 'users',
  });
  return Users;
};
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
  }
  users.init({
    fullName: DataTypes.STRING(80),
    userName: DataTypes.STRING(80),
    password: DataTypes.STRING,
    userType: DataTypes.INTEGER,
    register: DataTypes.INTEGER,
    email: DataTypes.STRING,
    status: DataTypes.BOOLEAN
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
  return users;
};
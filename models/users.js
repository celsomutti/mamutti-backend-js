'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require('bcrypt')
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.usertypes,{foreignKey:"userTypeId"});
    }
  }
  users.init({
    userFullName: DataTypes.STRING,
    userLogin: DataTypes.STRING,
    userEmail: DataTypes.STRING,
    userPassword: DataTypes.STRING,
    userTypeId: DataTypes.INTEGER,
    userStatus: DataTypes.TINYINT
  },
  {
    sequelize,
    modelName: 'users',
  });
  users.beforeCreate((user, option) => {
    if (user.isNewRecord) {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(user.getDataValue('userPassword'), salt);
  
     // user.password = hash; Not working
      user.setDataValue('userPassword', hash); // use this instead
    }
  });
  users.beforeUpdate((user, option) => {
    if (user.isNewRecord) {
      const salt = bcrypt.genSaltSync();
      const hash = bcrypt.hashSync(user.getDataValue('userPassword'), salt);
  
     // user.password = hash; Not working
      user.setDataValue('userPassword', hash); // use this instead
    }
  });
  return users;
};
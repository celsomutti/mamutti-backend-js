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
      // define association here
    }
  }
  usersModules.init({
    usersId: DataTypes.INTEGER,
<<<<<<< HEAD
    userAccessModulesId: DataTypes.INTEGER
=======
    userAccessModulesId: DataTypes.INTEGER,
>>>>>>> 1f6e24b5ee76784caa6b342f6435bc5ed818bc66
  }, {
    sequelize,
    modelName: 'usersModules',
  });
  return usersModules;
};
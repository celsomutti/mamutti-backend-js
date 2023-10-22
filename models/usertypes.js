'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class usertypes extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  usertypes.init({
    typeDescription: DataTypes.STRING,
    typeLevel: DataTypes.INTEGER,
    typeOnlyMaster: DataTypes.TINYINT
  }, {
    sequelize,
    modelName: 'usertypes',
  });
  return usertypes;
};
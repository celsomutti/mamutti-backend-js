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
    nomeCompleto: DataTypes.STRING,
    nomeUsuario: DataTypes.STRING,
    senhaUsuario: DataTypes.STRING,
    tipoUsuario: DataTypes.INTEGER,
    cadastro: DataTypes.INTEGER,
    situacao: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};
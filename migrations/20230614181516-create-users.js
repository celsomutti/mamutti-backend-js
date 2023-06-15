'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      fullName: {
        allowNull: false,
        type: Sequelize.STRING(80),
        validate: {
          notEmpty: { msg: "Campo nome não pode ser vazio" }
        },
      },
      userName: {
        allowNull: false,
        type: Sequelize.STRING(80),
        validate: {
          notEmpty: { msg: "Campo login não pode ser vazio" }
        },
      },
      password: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Campo senha não pode ser vazio" }
        },
      },
      userType: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: { msg: "Campo tipo não pode ser vazio" }
        },
      },
      register: {
        allowNull: false,
        type: Sequelize.INTEGER,
        validate: {
          notEmpty: { msg: "Campo cadastro não pode ser vazio" }
        },
      },
      email: {
        allowNull: false,
        type: Sequelize.STRING,
        validate: {
          notEmpty: { msg: "Campo endereço de E-Mail não pode ser vazio" }
        },
      },
      status: {
        allowNull: false,
        type: Sequelize.BOOLEAN,
        validate: {
          notEmpty: { msg: "Campo status não pode ser vazio" }
        },
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('users');
  }
};
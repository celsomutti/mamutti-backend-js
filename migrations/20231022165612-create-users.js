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
      userFullName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Campo nome do usuário não pode ser vazio!" }
        }
      },
      userLogin: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Campo login não pode ser vazio!" }
        }
      },
      userEmail: {
        type: Sequelize.STRING
      },
      userPassword: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Campo senha não pode ser vazio!" }
        }
      },
      userTypeId: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Campo tipo de usuário não pode ser vazio" }
        },
        references: {
          model: "usertypes",
          key: "id"
        },
        onUpdate: 'cascade',
        onDelete: 'cascade'
      },
      userStatus: {
        type: Sequelize.TINYINT,
        allowNull: false,
        validate: {
          notEmpty: { msg: "Status do usuário não pode ser vazio!" }
        }
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
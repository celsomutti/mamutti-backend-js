const sequelize = require('sequelize');
const model = require('../models');
const { response } = require('express');
const userType = model.usertypes;

module.exports = {
    async create(request, response) {
        try {
            const {
                usersId,
                userAccessModulesId,
            } = request.body

            const UserType = await userType.create({
                usersId,
                userAccessModulesId,
            });

            return response.json({ msg: "Acesso cadastrado com sucesso!" });

        } catch (error) {
            return response.json({ msg:"Não foi possivel cadastrar o acesso: " + error });
        }
    }, 

    async update(request, response) {
        try {
            const { id } = request.params;

            const {
                usersId,
                userAccessModulesId,
            } = request.body

            const UserType = await userType.update({
                usersId,
                userAccessModulesId,
            }, { where: { id } });

            return response.json({ msg: "Acesso alterado com sucesso!" });
        } catch (error) {
            return response.json({ msg: "Não foi possível alterar o acesso: " + error });
        }
    },

    async findAll(request, response) {
        try {
            const { page } = request.params;
            const limite = 5;

            const UserType = await userType.findAndCountAll({
                order: [
                    ['id', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page)
            })

            return response.json(UsersModules);

        } catch (error) {
            return response.json("Erro ao listar os acessos de usuários: " + error);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            const UserType = await UsersModules.destroy({
                where: {
                    id: id
                }
            });
            return response.json({ msg: "Acesso excluído com sucesso!" });
        } catch (error) {
            return response.json({ msg: "Não foi possível excluir o acesso: " + error });
        }
    }
}
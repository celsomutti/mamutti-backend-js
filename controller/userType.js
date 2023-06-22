const sequelize = require('sequelize');
const model = require('../models');
const { response } = require('express');
const userType = model.usertypes;

module.exports = {
    async create(request, response) {
        try {
            const {
                description,
                level,
                onlyMaster
            } = request.body

            const UserType = await userType.create({
                description,
                level,
                onlyMaster
            });

            return response.json({ msg: "Tipo de usuário cadastrado com sucesso!" });

        } catch (error) {
            return response.json({ msg:"Não foi possivel cadastrar o tipo de usuário: " + error });
        }
    }, 

    async update(request, response) {
        try {
            const { id } = request.params;

            const {
                description,
                level,
                onlyMaster
            } = request.body

            const UserType = await userType.update({
                description,
                level,
                onlyMaster
            }, { where: { id } });

            return response.json({ msg: "Tipo de usuário alterado com sucesso!" });
        } catch (error) {
            return response.json({ msg: "Não foi possível alterar o tipo de usuário: " + error });
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

            return response.json(UserType);

        } catch (error) {
            return response.json("Erro ao listar os tipos de usuários: " + error);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            const UserType = await userType.destroy({
                where: {
                    id: id
                }
            });
            return response.json({ msg: "Tipo de usuário excluído com sucesso!" });
        } catch (error) {
            return response.json({ msg: "Não foi possível excluir o tipo de usuário: " + error });
        }
    }
}
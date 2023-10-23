const sequelize = require('sequelize');
const model = require('../models');
const { response } = require('express');
const userAccessModules = model.userAccessModules;

module.exports = {
    async create(request, response) {
        try {
            const {
                moduleName,
                moduleDescription,
                moduleImageName            
            } = request.body

            const UserType = await userAccessModules.create({
                moduleName,
                moduleDescription,
                moduleImageName            
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
                moduleName,
                moduleDescription,
                moduleImageName            
            } = request.body

            const UserType = await userAccessModules.update({
                moduleName,
                moduleDescription,
                moduleImageName            
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

            const UserType = await userAccessModules.findAndCountAll({
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
            const UserType = await userAccessModules.destroy({
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
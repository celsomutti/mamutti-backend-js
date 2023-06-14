const sequelize = require('sequelize');
const model = require('../models');
const Op = sequelize.Op;
const user = model.user;

module.exports = {
    async create(request, response) {
        try {
            const {
                nomeCompleto,
                nomeUsuario,
                senhaUsuario,
                tipoUsuario,
                cadastro,
                situacao
            } = request.body
            
            const User = await user.create({
                nomeCompleto,
                nomeUsuario,
                senhaUsuario,
                tipoUsuario,
                cadastro,
                situacao            
            });

            return response.json({ msg: "Usuário cadastrado com sucesso!"});

        } catch (error) {
            return response.json({ msg:"Não foi possivel cadastrar u usuário: " + error });
        }
    }, 

    async update(request, response) {
        try {
            const { id } = request.params;

            const {
                nomeCompleto,
                nomeUsuario,
                senhaUsuario,
                tipoUsuario,
                cadastro,
                situacao
            } = request.body

            const User = await user.update({
                nomeCompleto,
                nomeUsuario,
                senhaUsuario,
                tipoUsuario,
                cadastro,
                situacao
            }, { where: { id } });

            return response.json({ msg: "Usuário alterado com sucesso!" });
        } catch (error) {
            return response.json({ msg: "Não foi possível alterar o usuário: " + error });
        }
    },

    async findAll(request, reponse) {
        try {
            const { page } = request.params;
            const limitView = 5;

            const User = await user.findAndCountAll({
                order: [
                    ['nomeCompleto', 'ASC']
                ],
                limit: limitView,
                offset: parseInt(page)
            })
            return response.json(User);

        } catch (error) {
            return response.json("Erro ao listar os usuários: " + error);
        }
    },

    async delete(request, response) {
        try {
            const { id } = request.params;
            const User = await user.destroy({
                where: {
                    id: id
                }
            });
            return response.json({ msg: "Usuário excluído com sucesso!" });
        } catch (error) {
            return response.json({ msg: "Não foi possível excluir o usuário: " + error });
        }
    }
}
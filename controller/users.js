const sequelize = require('sequelize');
const model = require('../models');
const { response } = require('express');
const Op = sequelize.Op;
const user = model.users;
const bcrypt = require('bcrypt');

const salt = bcrypt.genSaltSync();

module.exports = {
    async create(request, response) {
        try {
            const {
                fullName,
                userName,
                password,
                userType,
                register,
                email,
                status
            } = request.body
            
            password = bcrypt.hashSync(password, salt);

            const User = await user.create({
                fullName,
                userName,
                password,
                userType,
                register,
                email,
                status
            });

            return response.json({ msg: "Usuário cadastrado com sucesso!" });

        } catch (error) {
            return response.json({ msg:"Não foi possivel cadastrar o usuário: " + error });
        }
    }, 

    async update(request, response) {
        try {
            const { id } = request.params;

            const {
                fullName,
                userName,
                userType,
                register,
                email,
                status
            } = request.body

            const User = await user.update({
                fullName,
                userName,
                userType,
                register,
                email,
                status
            }, { where: { id } });

            return response.json({ msg: "Usuário alterado com sucesso!" });
        } catch (error) {
            return response.json({ msg: "Não foi possível alterar o usuário: " + error });
        }
    },

    async findAll(request, reponse) {
        try {
            const { page } = request.params;
            const limite = 5;

            const User = await user.findAndCountAll({
                order: [
                    ['id', 'ASC']
                ],
                limit: limite,
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
    },

    async changePassword(request, response) {
        try {
            const { userLogin } = request.params;
            
            const {
                password
            } = request.body           

            const User = await user.update({
                password //: bcrypt.hashSync(password, salt)
            }, 
                { where: { userName: userLogin } }
            );
            return response.json({ msg: "Senha alterada com sucesso!" });
        } catch (error) {
            return response.json({ msg: "Não foi possível alterar a senha: " + error });
        }
    }
}
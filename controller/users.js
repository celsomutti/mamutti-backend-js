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
                userFullName,
                userLogin,
                userEmail,
                userPassword,
                userTypeId,
                userStatus
            } = request.body

            const User = await user.create({
                userFullName,
                userLogin,
                userEmail,
                userPassword,
                userTypeId,
                userStatus
            });

            return response.status(200).json({success:true, msg: "Usuário cadastrado com sucesso!" });

        } catch (error) {
            return response.status(500).json({success:false, msg:"Não foi possivel cadastrar o usuário: " + error });
        }
    }, 

    async update(request, response) {
        try {
            const { id } = request.params;

            const userFind = await user.findOne({where: {id: id}});
            if (!userFind) throw new Error("Usuário não encontrado.");

            const {
                userFullName,
                userLogin,
                userEmail,
                userTypeId,
                userStatus
            } = request.body

            const User = await user.update({
                userFullName,
                userLogin,
                userEmail,
                userTypeId,
                userStatus
            }, { where: { id } });

            return response.status(200).json({success:true, msg: "Usuário alterado com sucesso!" });
        } catch (error) {
            return response.status(500).json({success:false, msg: "Não foi possível alterar o usuário: " + error });
        }
    },

    async findAll(request, response) {
        try {
            const { page } = request.params;
            const limite = 5;           

            const User = await user.findAndCountAll({
                //attributes: ['userFullName','userLogin','userEmail','userTypeId','userStatus'],
                order: [
                    ['id', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page),
                include:{
                    all:true
                }
            })

            return response.status(200).json(User);

        } catch (error) {
            return response.status(500).json({msg:"Erro ao listar os usuários: " + error});
        }
    },

    async findOneUser(request, response) {
        try {
            const { id } = request.params;
            const limite = 5;           

            const User = await user.findOne({
                where: {id: id},
                include:{
                    all:true
                }
            })
            if (!User) throw new Error("Usuário não encontrado.");
            return response.status(200).json(User);

        } catch (error) {
            return response.status(500).json({msg:"Erro ao listar o usuário: " + error});
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
            return response.status(200).json({success:true, msg: "Usuário excluído com sucesso!" });
        } catch (error) {
            return response.status(500).json({success:false, msg: "Não foi possível excluir o usuário: " + error });
        }
    },

    async changePassword(request, response) {
        try {            
            const {
                userName,
                userPassword
            } = request.body           
            
            const salt = bcrypt.genSaltSync(10);
            const hash = bcrypt.hashSync(userPassword, salt);
            
            const User = await user.update({
                userPassword: hash
            }, 
                { where: { userLogin: userName } }
            );
            return response.status(200).json({success:true, msg:"Senha alterada com sucesso!" });
        } catch (error) {
            return response.status(500).json({success:false, msg:"Não foi possível alterar a senha: " + error });
        }
    },

    async compareUserNamePassword(request, response) {
        try{
            const {userName, password} = request.body;
            const User = await user.findOne({where: {userLogin: userName}});
            if (!User) throw new Error("Usuário não encontrado.");
            const isPasswordValid = await bcrypt.compare(password, User.userPassword);
            if (!isPasswordValid) throw new Error("Senha incorreta");
            return response.status(200).json({success:true, msg:"Login efetuado com sucesso!"})
        } catch (error) {
            return response.status(500).json({success:false, msg:"Não foi possível verificar o login: " + error});   
        }
   }
}
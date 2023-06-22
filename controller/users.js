const sequelize = require('sequelize');
const model = require('../models');
const { response } = require('express');
const Op = sequelize.Op;
const user = model.users;
const bcrypt = require('bcrypt');

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

    async findAll(request, response) {
        try {
            const { page } = request.params;
            const limite = 5;
            

            const User = await user.findAndCountAll({
                order: [
                    ['id', 'ASC']
                ],
                limit: limite,
                offset: parseInt(page),
                include:{
                    all:true
                }
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
                password 
            }, 
                { where: { userName: userLogin } }
            );
            return response.json({ msg: "Senha alterada com sucesso!" });
        } catch (error) {
            return response.json({ msg: "Não foi possível alterar a senha: " + error });
        }
    },
    async compareUserNamePassword(request, response) {
        try {
            const { userLogin } = request.params;
            const { password  } = request.body

            const salt = await bcrypt.genSalt(10);

            const User = await user.findOne({
                where: {
                    username: userLogin
                  },                
                  include:{
                    all:true
                }
            })            

            bcrypt.hash(password, salt).then(hashedPassword => {
   
                // Display the hashed password
                console.log(user.password);
                console.log(hashedPassword);
                  
                // Compare the password with hashed password
                // and return its value 
                return bcrypt.compare(password, hashedPassword);
               
            }).then(isMatch => {
               
                // If password matches then display true
                return response.json({ msg: 'Senha válida!' });
            }).catch(err => {
              
                // Display error log
                console.log(err);
                return response.json({ msg: 'Senha inválida: ' + err });
            });       

        } catch (error) {
            return response.json ({ msg: "Erro ao listar os usuários: " + error });
        }
    }
}
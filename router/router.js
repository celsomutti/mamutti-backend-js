const express = require('express');
const router = express.Router();
const user = require('../controller/users');
const typeUser = require('../controller/userType');

//Usuário

router.post('/criar/usuario', user.create);
router.get('/listar/usuario/:page', user.findAll);
router.put('/atualizar/usuario/:id', user.update);
router.put('/alterasenha/usuario/:userLogin', user.changePassword);
router.delete('/excluir/usuario/:id', user.delete);
router.get('/login/usuario/:userLogin', user.compareUserNamePassword);

//Tipos de Usuário

router.post('/criar/tipousuario', typeUser.create);
router.get('/listar/tipousuario/:page', typeUser.findAll);
router.put('/atualizar/tipousuario/:id', typeUser.update);
router.delete('/excluir/tipousuario/:id', user.delete);

module.exports = router;
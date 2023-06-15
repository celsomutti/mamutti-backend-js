const express = require('express');
const router = express.Router();
const user = require('../controller/users');

//Usuário

router.post('/criar/usuario', user.create);
router.get('/listar/usuario/:page', user.findAll);
router.put('/atualizar/usuario/:id', user.update);
router.put('/alterasenha/usuario/:userLogin', user.changePassword);

module.exports = router;
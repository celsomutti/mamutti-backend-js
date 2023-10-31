const express = require('express');
const router = express.Router();
const user = require('../controller/users');
const typeUser = require('../controller/userType');
const modulesAccess = require('../controller/userAccessModules');
const userModules = require("../controller/usersModules");

//Usuário

router.post('/create/users', user.create);
router.get('/getAll/users/:page', user.findAll);
router.get('/find/users/:id', user.findOneUser);
router.put('/update/users/:id', user.update);
router.put('/change/password', user.changePassword);
router.delete('/delete/users/:id', user.delete);
router.get('/login/users', user.compareUserNamePassword);

//Tipos de Usuário

router.post('/create/userType', typeUser.create);
router.get('/getAll/userType/:page', typeUser.findAll);
router.put('/update/userType/:id', typeUser.update);
router.delete('/delete/userType/:id', user.delete);

//módulos do sistema

router.post('/create/moduleSys', modulesAccess.create);
router.get('/getAll/moduleSys', modulesAccess.findAll);
router.put('/update;moduleSys/:id', modulesAccess.update);
router.delete('/delete;moduleSys;:id', modulesAccess.delete)

//acessos de usuários aos módulos do sistema

router.post('/create/userModule', userModules.create);
router.get('/getAll/userModule', userModules.findAll);
router.put('/update/userModule/:id', userModules.update);
router.delete('/delete/userModule/:id', userModules.delete)

module.exports = router;
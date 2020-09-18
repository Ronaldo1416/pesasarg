const express = require('express');
const router = express.Router();
const path = require('path');
const mantenimiento = require('../middlewares/mantenimiento');
const {check,validationResult,body} = require ("express-validator")
//Requerir el modulo de los controladores
const usuariosController = require(path.resolve(__dirname, '../controllers/usuariosController'));

// Métodos en nuestros controladores: index - show - edit - delete 
router.get('/login', mantenimiento,usuariosController.login);
router.get('/registro', usuariosController.registro);
router.post('/registro', [
    check('first_name').isLength({
      min: 1
    }).withMessage('El campo nombre no puede estar vacío'),
    check('last_name').isLength({
      min: 1
    }).withMessage('El campo apellido no puede estar vacío'),
    check('email').isEmail().withMessage('Agregar un email válido'),
    check('password').isLength({
      min: 8
    }).withMessage('La contraseña debe tener un mínimo de 8 caractéres')
  ], usuariosController.create);
  module.exports = router;
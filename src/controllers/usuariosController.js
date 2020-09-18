const path = require('path');
const fs = require('fs');
const bcrypt = require('bcrypt');
const {
  check,
  validationResult,
  body
} = require('express-validator');
let provincia = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/provincias.json')));
let provincias = provincia.sort(function (a, b) {
    if (a.nombre > b.nombre) {
      return 1;
    }
    if (a.nombre < b.nombre) {
      return -1;
    }
    // a debe ser igual a b
    return 0;
  });
const usuariosController = {
    login: function(req,res){
        res.render(path.resolve(__dirname, '../views/usuarios/login'));
    },
    registro: function(req,res){
        res.render(path.resolve(__dirname, '../views/usuarios/registro'), {provincias});
    },
    create: (req, res, next) => {
      let errors = validationResult(req);
      if (errors.isEmpty()) {
        let user = {
          nombre: req.body.first_name,
          apellido: req.body.last_name,
          email: req.body.email,
          password: bcrypt.hashSync(req.body.password, 10),
          provincia:req.body.provincia,
          role:1
        }
        let archivoUsers = fs.readFileSync(path.resolve(__dirname, '../models/users.json'), {
          encoding: 'utf-8'
        });
        let users = [];
        if (archivoUsers == "") {
          users = [];
        } else {
          users = JSON.parse(archivoUsers);
        };
        users.push(user);
        usersJSON = JSON.stringify(users, null, 2);
        fs.writeFileSync(path.resolve(__dirname, '../models/users.json'), usersJSON);
        res.redirect('/login');
      } else {
        return res.render(path.resolve(__dirname, '../views/usuarios/registro'), {
          errors: errors.errors, provincias
        });
      }
    },
}
module.exports = usuariosController;
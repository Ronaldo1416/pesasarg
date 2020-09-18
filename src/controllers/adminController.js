const path = require('path');
const fs = require('fs');
const { response } = require('express');

module.exports = {
    index : (req,res) =>{
        let platos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/platos.json')));
        res.render(path.resolve(__dirname , '..','views','admin','index') , {platos});
    },
    create: (req,res) =>{
        let platos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/platos.json')));
        res.render(path.resolve(__dirname, '..','views','admin','create'));
    },
    save: (req,res) =>{
        //res.send(req.body);
        let platos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/platos.json')));
        //----------------------------------------
        //Solución a la prblemática de el id duplicado. (De acuerdo a la Indicado por Papacho y Ronaldo).
        let platosTotales  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/platos.json')));
        let ultimoPlato = platosTotales.pop();
        //-----------------------------------------
        //Solución de lo mismo - propuesto por Edu.
        //-----------------------------
        //let ultimo = platos[platos.length-1];
        //-----------------------------
        let nuevoPlato = {
            id : ultimoPlato.id +1,
            nombre : req.body.nombre,
            descripcion : req.body.descripcion,
            precio: req.body.precio,
            descuento: req.body.descuento,
            //imagen: req.file.filename
            //Controlar si el usuario subio o no una imagen
            imagen: req.file ? req.file.filename : ""     //If Ternario 
        }
        
        //res.send(nuevoPlato);
        platos.push(nuevoPlato);
        platosJSON = JSON.stringify(platos,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../models/platos.json'),platosJSON);
        res.redirect('/administrar');
    },
    show: (req,res) => {
        //res.send(req.params.id);
        let platos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/platos.json')));
        let platoId = req.params.id;
        const platoComida = platos.find(plato => plato.id == platoId);
        res.render(path.resolve(__dirname, '..','views','admin','detail'), {platoComida});
    },
    destroy: (req,res) => {
        let platos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/platos.json')));
        const platoId = req.params.id;
        const platoComidaFinal = platos.filter(plato => plato.id != platoId);
        platosJSON = JSON.stringify(platoComidaFinal,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../models/platos.json'),platosJSON);
        res.redirect('/administrar');
    },
    edit: (req,res) => {
        let platos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/platos.json')));
        let platoId = req.params.id;
        const platoComida = platos.find(plato => plato.id == platoId);
        res.render(path.resolve(__dirname, '..','views','admin','edit'), {platoComida});
    },
    update: (req,res) =>{
        console.log(req.file);
        let platos  = JSON.parse(fs.readFileSync(path.resolve(__dirname, '../models/platos.json')));
        req.body.id = req.params.id;
        req.body.imagen = req.file ? req.file.filename : req.body.oldImagen; 
        let platosUpdate = platos.map(plato =>{    //id nombre descripcion precio imagen
            if(plato.id == req.body.id){
                return plato = req.body;
            }
            return plato;
        });
        platosJSON = JSON.stringify(platosUpdate,null,2);
        fs.writeFileSync(path.resolve(__dirname, '../models/platos.json'),platosJSON);
        res.redirect('/administrar');       


    }


}

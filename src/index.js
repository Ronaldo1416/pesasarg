const express = require('express');
const methodOverride = require('method-override');
const app = express();

//Aquí debo requerir mi Middleware de Mantenimiento
//const mantenimiento = require('./middlewares/mantenimiento');


//Debemos decirle a node - Donde estan nuestros archivos estáticos
app.use(express.static('public'));

//Setear cual va a corresponder Template Engine  - EJS 
app.set('view engine','ejs');

//Considerar que al enviar los datos desde el formulario los mismos lleguen al Servidor
app.use(express.urlencoded({extended: false}));
//Middleware para determinar metodos HTTP distintos a los aceptados por los formularios (GET - POST)
app.use(methodOverride('_method'));


//Aquí debería colocar mi Middleware
//app.use(mantenimiento);

//Rutas  - Requerir archivo donde esta la ruta
const webRoutes = require('./routes/webRoutes');
const usuariosRoutes = require('./routes/usuariosRoutes');
const productoRoutes = require('./routes/productosRoutes');
const adminRoutes = require('./routes/adminRoutes');

//Usar ese archivo de rutas
app.use(webRoutes);
app.use(usuariosRoutes);
app.use(productoRoutes);
app.use(adminRoutes);
//Levantar nuestro servidor
app.listen(3303,()=>console.log('Servidor corriendo en el puerto 3303'));
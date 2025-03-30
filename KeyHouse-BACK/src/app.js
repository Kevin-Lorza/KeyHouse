const express = require('express');
const config = require('./config');
const morgan = require('morgan');
const usuarios = require('./modulos/usuarios/rutas');
const casas = require("./modulos/casas/rutas");
const cors = require('cors');
const app = express();
const error_red = require('./red/errors');


app.use(cors({origin: 'http://localhost:3000',})); // Permitir solo solicitudes desde el frontend

// Nueva ruta para registrar casas
app.use("/api/casas", casas);

// Servir imágenes estáticamente
app.use("/uploads", express.static("uploads"));

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Configuración
app.set('port', config.app.port);

// Rutas conexion 

app.use('/api/usuarios', usuarios);


// Asigna las rutas
app.use(error_red)

module.exports = app;

const express = require('express');
const config = require('./config');
const morgan = require('morgan');
const alquileresRoutes = require('./modulos/alquileres/rutas');
const usuarios = require('./modulos/usuarios/rutas');
const casas = require("./modulos/casas/rutas");
const cors = require('cors');
const app = express();
const error_red = require('./red/errors');
const favoritosRuta = require('./modulos/favoritos/rutas');

app.use(cors({ origin: 'http://localhost:3000' })); // Permitir solo solicitudes desde el frontend

// Nueva ruta para registrar casas
app.use("/api/casas", casas);

// Servir imágenes estáticamente
app.use("/uploads", express.static("uploads"));

//Middlewares
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configuración
app.set('port', config.app.port);

// Rutas conexion 
app.use('/api/usuarios', usuarios);

// Asigna las rutas
app.use(error_red)

// Ruta en el backend para obtener los favoritos de un usuario
app.get('/api/favoritos', (req, res) => {
    const usuario_id = req.user.id; // Suponiendo que tienes una forma de obtener el id del usuario
    const query = 'SELECT * FROM casas WHERE id IN (SELECT casa_id FROM favoritos WHERE usuario_id = $1)';
    pool.query(query, [usuario_id], (err, result) => {
      if (err) {
        console.error('Error al obtener los favoritos', err);
        return res.status(500).json({ error: 'Error al obtener los favoritos' });
      }
      res.json(result.rows); // Devuelve las casas favoritas
    });
});

// Ruta para eliminar favoritos
app.use('/api/favoritos', favoritosRuta);

app.use('/api/alquileres', alquileresRoutes);

module.exports = app;

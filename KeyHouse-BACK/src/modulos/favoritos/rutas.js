const express = require('express');
const router = express.Router();
const {
  agregarFavorito,
  obtenerFavoritosPorUsuario,
  eliminarFavorito,
} = require('./controlador');

// Ruta para agregar casa a favoritos
router.post('/agregar', agregarFavorito);

// Ruta para obtener favoritos por usuario
router.get('/:usuario_id', obtenerFavoritosPorUsuario);

// Ruta para eliminar una casa de favoritos
router.delete('/eliminar', eliminarFavorito);


module.exports = router;

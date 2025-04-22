const pool = require('../../DB/db'); // Asegúrate de que esté correctamente importado
// Eliminar casa de favoritos

const eliminarFavorito = async (req, res) => {
  const { usuario_id, casa_id } = req.body;

  try {
    const result = await pool.query(
      'DELETE FROM favoritos WHERE usuario_id = $1 AND casa_id = $2 RETURNING *',
      [usuario_id, casa_id]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({ mensaje: 'El favorito no se encontró.' });
    }

    res.json({ mensaje: 'Favorito eliminado con éxito.' });
  } catch (error) {
    console.error('Error al eliminar favorito:', error);
    res.status(500).json({ mensaje: 'Error interno al eliminar favorito.' });
  }
};

// Agregar casa a favoritos
const agregarFavorito = async (req, res) => {
  const { usuario_id, casa_id } = req.body;

  try {
    // Evitar duplicados
    const existe = await pool.query(
      'SELECT * FROM favoritos WHERE usuario_id = $1 AND casa_id = $2',
      [usuario_id, casa_id]
    );

    if (existe.rows.length > 0) {
      return res.status(400).json({ mensaje: 'La casa ya está en tus favoritos.' });
    }

    await pool.query(
      'INSERT INTO favoritos (usuario_id, casa_id) VALUES ($1, $2)',
      [usuario_id, casa_id]
    );

    res.json({ mensaje: 'Casa agregada a favoritos.' });
  } catch (error) {
    console.error('Error al agregar favorito:', error);
    res.status(500).json({ mensaje: 'Error interno al agregar favorito.' });
  }
};

// Obtener todas las casas favoritas de un usuario
const obtenerFavoritosPorUsuario = async (req, res) => {
  const { usuario_id } = req.params;

  try {
    const favoritos = await pool.query(
      `SELECT casas.* FROM casas
       INNER JOIN favoritos ON casas.id = favoritos.casa_id
       WHERE favoritos.usuario_id = $1`,
      [usuario_id]
    );

    res.json(favoritos.rows);
  } catch (error) {
    console.error('Error al obtener favoritos:', error);
    res.status(500).json({ mensaje: 'Error interno al obtener favoritos.' });
  }
};

module.exports = {
  agregarFavorito,
  obtenerFavoritosPorUsuario,
  eliminarFavorito
};

const pool = require("../../DB/pg");
const multer = require("multer");
const path = require("path");

// Configurar multer para subir imágenes a "uploads/"
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Carpeta donde se guardan las imágenes
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

const registrarCasa = async (req, res) => {
  try {
    const { titulo, descripcion, precio, ubicacion, usuario_id } = req.body;
    const imagen = req.file ? req.file.filename : null;

    if (!titulo || !descripcion || !precio || !ubicacion || !usuario_id || !imagen) {
      return res.status(400).json({ error: "Todos los campos son obligatorios" });
    }

    const query = `
      INSERT INTO casas (titulo, descripcion, precio, ubicacion, imagen, usuario_id)
      VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
    `;
    const values = [titulo, descripcion, precio, ubicacion, imagen, usuario_id];

    const { rows } = await pool.query(query, values);
    res.json({ mensaje: "Casa registrada con éxito", casa: rows[0] });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error al registrar la casa" });
  }
};

module.exports = { registrarCasa, upload };

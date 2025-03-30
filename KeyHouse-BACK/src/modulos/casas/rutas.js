const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../../DB/db");

const router = express.Router();

// Configurar almacenamiento de imágenes
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

// Ruta para registrar una casa
router.post("/registrar", upload.array("imagen", 5), async (req, res) => {
    try {
        const { titulo, descripcion, ubicacion, precio, ususario_id } = req.body;
        const imagen = req.files.map(file => file.path); // Guardar rutas de imágenes

        const query = `
            INSERT INTO casas (titulo, descripcion, ubicacion, precio, imagen, usuario_id) 
            VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [titulo, descripcion, ubicacion, precio, imagen, ususario_id];

        const result = await db.query(query, values);
        res.json({ message: "Casa registrada exitosamente", casa: result.rows[0] });
    } catch (error) {
        console.error("Error al registrar casa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});

module.exports = router;

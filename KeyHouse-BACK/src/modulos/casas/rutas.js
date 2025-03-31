const express = require("express");
const multer = require("multer");
const path = require("path");
const db = require("../../DB/db");
const { obtenerCasas } = require("../../DB/pg"); // Cambiar a pg.js


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

router.get("/", async (req, res) => {
    try {
        console.log("Se recibió una solicitud GET a /api/casas");

        const casas = await obtenerCasas(); // Usar la función de pg.js

        res.json(casas);
    } catch (error) {
        console.error("Error al obtener casas:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


// Ruta para registrar una casa
router.post("/registrar", upload.array("imagen", 5), async (req, res) => {
    try {
        console.log("Datos recibidos en req.body:", req.body);
        console.log("Archivos recibidos en req.files:", req.files);

        const { titulo, descripcion, ubicacion, precio, usuario_id } = req.body;
        
        if (!titulo || !descripcion || !ubicacion || !precio || !usuario_id) {
            return res.status(400).json({ error: "Todos los campos son obligatorios" });
        }

        const imagenes = req.files.map(file => file.path.replace(/\\/g, "/")); // Corrige las barras
        const imagenesJSON = JSON.stringify(imagenes); // Guarda el array correctamente

        const query = `
        INSERT INTO casas (titulo, descripcion, ubicacion, precio, imagen, usuario_id) 
        VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;
        `;
        const values = [titulo, descripcion, ubicacion, precio, imagenesJSON, usuario_id];

        const result = await db.query(query, values);

        console.log("Casa guardada en la base de datos:", result.rows[0]);

        res.json({ message: "Casa registrada exitosamente", casa: result.rows[0] });
    } catch (error) {
        console.error("Error al registrar casa:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
});


module.exports = router;
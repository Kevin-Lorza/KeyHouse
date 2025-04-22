const db = require('../../DB/db'); // Asegúrate de que la ruta sea correcta

async function registrarAlquiler(req, res) {
    const { usuario_id, casa_id } = req.body;

    try {
        // Verifica que db esté definido y sea un objeto con el método query
        if (!db || typeof db.query !== 'function') {
            console.error('El cliente de la base de datos no está correctamente inicializado');
            return res.status(500).json({ error: 'Error interno del servidor' });
        }

        // Ejecuta la consulta para insertar el alquiler
        await db.query(
            'INSERT INTO alquileres (usuario_id, casa_id, fecha_alquiler, estado) VALUES ($1, $2, NOW(), $3)',
            [usuario_id, casa_id, 'pendiente']
        );

        // Responde con un mensaje de éxito
        res.json({ mensaje: 'Alquiler registrado con éxito.' });
    } catch (error) {
        // Si ocurre un error, lo captura y lo muestra
        console.error('Error al registrar alquiler:', error);
        res.status(500).json({ error: 'Error al registrar el alquiler.' });
    }
}

module.exports = { registrarAlquiler };

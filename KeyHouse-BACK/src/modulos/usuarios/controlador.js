// Se realizan las consultas 
const db = require('../../DB/pg');

const TABLA = 'usuarios';

function todos() {
    return db.todos(TABLA);
}

function uno(id) {
    return db.uno(TABLA, id);
}

function eliminar(body) {
    return db.eliminar(TABLA, body);
}

function agregar(body) {
    return db.agregar(TABLA, body);
}

async function cambiarContrasena(email, password) {
    return db.actualizarContrasena(TABLA, email, password); // Usar la contraseña directamente
}

module.exports = {
    todos,
    uno,
    eliminar,
    agregar,
    cambiarContrasena, // Exportar la función
};

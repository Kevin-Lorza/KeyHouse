const config = require('../config');
const { Client } = require('pg');

const pgconfig = {
    user: config.pg.user,
    host: config.pg.host,
    database: config.pg.database,
    password: config.pg.password,
    port: config.pg.port,
};

let conexion;

// Función para conectar a la base de datos
function conpg() {
    conexion = new Client(pgconfig);

    conexion.connect(err => {
        if (err) {
            console.error('[db error]', err);
            setTimeout(conpg, 5000); // Reintentar conexión después de 5 segundos
        } else {
            console.log('✅ Conectado a PostgreSQL');
        }
    });

    conexion.on('error', err => {
        console.error('[db error]', err);
        conpg(); // Intentar reconectar
    });
}

// Iniciar la conexión
conpg();

function query(text, params) {
    return conexion.query(text, params);
}

module.exports = {
    query
};
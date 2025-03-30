const config = require('../config');
const db = require('pg');
const pgconfig = {
    user: config.pg.user,
    host: config.pg.host,
    database: config.pg.database,
    password: config.pg.password,
    port: config.pg.port,
}

let conexion;

//Verifica la conexion con la base de datos
function conpg() {
    conexion = new db.Client(pgconfig);

    conexion.on('error', err => {
        console.error('[db err]', err);
        if(err.code === 'PROTOCOL_CONNECTION_LOST') {
            conpg();
        }else {
            throw err;
        }
    })
}

conpg();

function query(text, params) {
    return conexion.query(text, params);
}

module.exports = {
    query
};
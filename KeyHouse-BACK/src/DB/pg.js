//const mysql = require('mysql');
const config = require('../config');
const pg = require('pg');

//const {pg: pgconfig} = require('../config');

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
    conexion = new pg.Client(pgconfig);

    conexion.connect((err)=> {
        if(err) {
            console.log('[db err]', err);
            setTimeout(conpg, 200); 
        }else {
            console.log('Conectado a la base de datos usuarios');
        }
    })

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

//Funciones de modificacion a la base de datos

function todos(tabla) {
    return new Promise ((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla}`, (error, result) => {
            return error ? reject(error) : resolve(result.rows);
        })
    });
}

function uno(tabla, id) {
    return new Promise ((resolve, reject) => {
        conexion.query(`SELECT * FROM ${tabla} WHERE id_usuario = ${id}`, (error, result) => {
            return error ? reject(error) : resolve(result.rows);
        })
    });
}


async function agregar(tabla, data) {
    const existe = await verificarExistencia(tabla, data.email);
    if (existe) {
        await actualizar(tabla, data);
        return { accion: 'actualizar', data };
    } else {
        await insertar(tabla, data);
        return { accion: 'insertar', data };
    }
}

function verificarExistencia(tabla, email) {
    return new Promise((resolve, reject) => {
        const query = `SELECT COUNT(*) FROM ${tabla} WHERE email = $1;`;

        console.log('Consulta SELECT:', query);
        console.log('Email:', email);

        conexion.query(query, [email], (error, result) => {
            if (error) {
                reject(error);
            } else {
                const count = parseInt(result.rows[0].count, 10);
                resolve(count > 0);
            }
        });
    });
}


// function eliminar(tabla, data){
//     return new Promise ((resolve, reject) => {
//         conexion.query(`DELETE FROM ${tabla} WHERE id = ?`,data.id, (error, result) => {
//             return error ? reject(error) : resolve(result.rows);
//         })
//     }); 
// }

function eliminar(tabla, data) {
    return new Promise((resolve, reject) => {
        const query = `DELETE FROM ${tabla} WHERE email = ${data.email};`;
        conexion.query(query, [data.email], (error, result) => {
            return error ? reject(error) : resolve(result.rows);
        });
    });
}


function insertar(tabla, data) {
    return new Promise((resolve, reject) => {
        // Obtener las claves (columnas) y valores del JSON
        const columnas = Object.keys(data).join(", ");
        const valores = Object.values(data);
        const placeholders = valores.map((_, index) => `$${index + 1}`).join(", ");

        // Crear la consulta dinámica
        const query = `INSERT INTO ${tabla} (${columnas}) VALUES (${placeholders}) RETURNING *;`;

        console.log(query);

        // Ejecutar la consulta con los valores
        conexion.query(query, valores, (error, result) => {
            if (error) {
                reject(error); // Retornar el error si ocurre
            } else {
                resolve(result.rows); // Retornar los datos insertados
            }
        });
    });
}


function actualizar(tabla, data) {
    return new Promise((resolve, reject) => {
        // Construir dinámicamente las columnas y valores para actualizar
        const columnas = Object.keys(data)
            .filter((key) => key !== "email") // Excluir "email" del SET
            .map((key, index) => `${key} = $${index + 1}`)
            .join(", ");
        const valores = Object.keys(data)
            .filter((key) => key !== "email")
            .map((key) => data[key]);
        valores.push(data.email); // Agregar el email al final para el WHERE

        const query = `UPDATE ${tabla} SET ${columnas} WHERE email = $${valores.length} RETURNING *;`;

        conexion.query(query, valores, (error, result) => {
            return error ? reject(error) : resolve(result.rows);
        });
    });
}

function actualizarContrasena(tabla, email, contraseña) {
    return new Promise((resolve, reject) => {
        const query = `UPDATE ${tabla} SET contraseña = $1 WHERE email = $2 RETURNING *;`;
        const valores = [contraseña, email];

        conexion.query(query, valores, (error, result) => {
            if (error) {
                reject(error); // Si ocurre un error, rechazar la promesa
            } else if (result.rowCount === 0) {
                resolve(false); // No se encontró un usuario con ese email
            } else {
                resolve(true); // Contraseña actualizada con éxito
            }
        });
    });
}

module.exports = {
    todos,
    uno,
    agregar,
    eliminar,
    actualizarContrasena, // Exportar la nueva función
};

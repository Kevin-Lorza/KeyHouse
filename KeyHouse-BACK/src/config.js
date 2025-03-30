require('dotenv').config();

//moduos
module.exports = {
    app: {
        port: process.env.PORT || 4000
    },
    pg: {
        host: process.env.PG_HOST || 'localhost',// Dirección del servidor de PostgreSQL
        user: process.env.PG_USER || 'postgres',  // Usuario de PostgreSQL
        password: process.env.PG_PASSWORD || 'Kevin-03-12', // Contraseña del usuario
        database: process.env.PG_DATABASE || 'db_prueba',// Nombre de la base de datos en PostgreSQL
        port: process.env.PG_PORT || 5432, //Puerto del servidor de PostgresSQL
    }
}


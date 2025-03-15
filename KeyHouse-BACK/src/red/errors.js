const respuestas = require('./respuestas');


//Se muestra el mensaje de error
function errors(err, req, res, next){
    console.error('[error]', err);

    const mensaje = err.message || 'Error interno';
    const status = err.statusCode || 500;

    respuestas.error(req, res, mensaje, status);
}

module.exports = errors;
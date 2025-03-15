const app = require('./app');

// Inicia el servidor
app.listen(app.get('port'), () => {
    console.log(`servidor escuchando en el puerto ${app.get('port')}`);
});
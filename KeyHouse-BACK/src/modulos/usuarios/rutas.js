const express = require('express');
const router = express.Router();

const respuestas = require('../../red/respuestas');
const controlador = require('./controlador');

router.get('/', todos);
router.get('/:id', uno);
router.post('/', agregar);
router.put('/', eliminar);
router.put('/cambiarContrasena', cambiarContrasena);

// Ruta GET principal para usuarios
async function todos (req, res, next){
    try{
        const items = await controlador.todos();
        respuestas.success(req, res, items, 200);
    }catch(err){
        next(err)
    }

    };

async function uno (req, res, next){
    try{
        const items = await controlador.uno(req.params.id);
        respuestas.success(req, res, items, 200);
    }catch(err){
        next(err)
    }
    
    };


async function agregar(req, res, next) {
    try {
        console.log(req.body);

        // Llama al controlador para manejar la operación (inserción/actualización)
        const items = await controlador.agregar(req.body);

        // Verifica si el `id` está presente y es mayor que 0
        let mensaje;
        console.log('RESULTADO ITEMS: ', items.accion);
        if(items.accion == 'actualizar'){
            mensaje = 'Item actualizado exitosamente';
        }else{
            mensaje = 'Item agregado exitosamente';
        }

        // Responde con el mensaje adecuado
        respuestas.success(req, res, mensaje, 201);
    } catch (err) {
        next(err);
    }
}


async function eliminar (req, res, next){
    try{
        const items = await controlador.eliminar(req.body);
        respuestas.success(req, res,'Item eliminado exitosamente', 200);
    }catch(err){
        next(err)
    }
    
    };


async function cambiarContrasena(req, res, next) {
    try {
        const { email, contraseña } = req.body;
        
        // Verifica que los datos existan en el body
        if (!email || !contraseña) {
            return respuestas.error(req, res, 'Email o contraseña no proporcionados', 400);
        }
        
        // Llama a la función del controlador para actualizar la contraseña
        const resultado = await controlador.cambiarContrasena(email, contraseña);

        if (resultado.length === 0) {
            return respuestas.error(req, res, 'Usuario no encontrado', 404);
        }

        // Responde con éxito
        respuestas.success(req, res, 'Contraseña actualizada correctamente', 200);
    } catch (err) {
        next(err);
    }
}

module.exports = router;

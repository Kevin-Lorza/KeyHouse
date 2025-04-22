const express = require('express');
const router = express.Router();
const { registrarAlquiler } = require('./controlador');

router.post('/registrar', registrarAlquiler);

module.exports = router;

const express = require('express');
const router = express.Router();
const { handleDelay } = require('../controllers/delayController');  // Importamos el controlador

// Ruta para manejar el retraso
router.get('/', handleDelay);

module.exports = router;

const express = require('express');
const router = express.Router();
const { handleStreamData } = require('../controllers/streamController');  // Importamos el controlador

// Ruta para manejar la transmisión de datos grandes
router.get('/', handleStreamData);

module.exports = router;

const express = require('express');
const router = express.Router();
const { handleMemoryLoad } = require('../controllers/memoryController');  // Importamos el controlador

// Ruta para simular el uso de memoria
router.get('/', handleMemoryLoad);

module.exports = router;
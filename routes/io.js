const express = require('express');
const router = express.Router();
const { handleIO } = require('../controllers/ioController');

// Ruta para /io (leemos o escribimos en un archivo)
router.post('/', handleIO);

module.exports = router;

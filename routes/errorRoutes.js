const express = require('express');
const router = express.Router();
const { intentionalError } = require('../controllers/errorController');

// Ruta para devolver errores intencionales
router.get('/', intentionalError);

module.exports = router;

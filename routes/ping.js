const express = require('express');
const router = express.Router();
const { handlePing } = require('../controllers/pingController');

// Ruta para /ping
router.get('/', handlePing);

module.exports = router;

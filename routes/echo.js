const express = require('express');
const router = express.Router();
const { handleEcho } = require('../controllers/echoController');

// Ruta para /echo
router.post('/', handleEcho);

module.exports = router;

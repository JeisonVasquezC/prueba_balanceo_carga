const express = require('express');
const router = express.Router();
const { handleIntensive } = require('../controllers/intensiveController');

// Ruta para /intensive
router.get('/', handleIntensive);

module.exports = router;

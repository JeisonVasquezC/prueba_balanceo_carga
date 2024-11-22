const express = require('express');
const router = express.Router();
const { handleProcess } = require('../controllers/processController');

// Ruta para /process
router.post('/', handleProcess);

module.exports = router;

const express = require('express');
const bodyParser = require('body-parser');
const pingRoutes = require('./routes/ping');
const echoRoutes = require('./routes/echo');
const processRoutes = require('./routes/process');
const intensiveRoutes = require('./routes/intensive');
const ioRoutes = require('./routes/io');
const delayRoutes = require('./routes/delayRoutes');
const memoryRoutes = require('./routes/memoryRoutes');
const streamRoutes = require('./routes/streamRoutes');
const errorRoutes = require('./routes/errorRoutes');

const app = express();
const PORT = 3000;

// Middleware para parsear JSON
app.use(express.json({ limit: '100mb' }));
app.use(express.urlencoded({ extended: true, limit: '100mb' }));
// Aumenta el límite de tamaño del cuerpo
app.use(bodyParser.json({ limit: '100mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '100mb' }));

// Middleware para registrar la información de la solicitud y capturar la respuesta
app.use((req, res, next) => {
    const logMessage = `[${new Date().toISOString()}] ${req.method} ${req.url}`;
    console.log(logMessage);  // Muestra la solicitud entrante
    
    // Captura el contenido de la respuesta y el código de estado
    const originalSend = res.send;
    const originalStatus = res.status;
    
    // Sobrescribimos res.status para capturar el código de estado
    res.status = (code) => {
      res._statusCode = code;  // Guardamos el código de estado en una variable interna
      return originalStatus.call(res, code);  // Llamamos a la función original para establecer el código
    };
    
    // Sobrescribimos res.send para capturar el cuerpo de la respuesta
    res.send = (body) => {
      // Aquí guardamos el código de estado y el cuerpo de la respuesta y los imprimimos
      console.log(`[${new Date().toISOString()}] RESPONSE: Status ${res.statusCode} || Body: ${body}`);
      // Luego enviamos la respuesta normalmente
      originalSend.call(res, body);
    };
  
    // Middleware para capturar errores
    res.on('finish', () => {
      if (res.statusCode >= 400) {  // Si el código de estado es un error (400 o superior)
        console.error(`[${new Date().toISOString()}] ERROR: Status ${res.statusCode} || Message: ${res.statusMessage}`);
      }
    });
  
    next();  // Pasar al siguiente middleware o ruta
  });
  
// Middleware de manejo de errores (opcional) para capturar errores no manejados
app.use((err, req, res, next) => {
    console.error(`[${new Date().toISOString()}] Unhandled Error: ${err.message}`);  // Captura errores no manejados
    res.status(500).json({ error: 'Internal Server Error' });  // Enviar respuesta de error
  });

// Configurar rutas
app.use('/', pingRoutes);
app.use('/ping', pingRoutes);
app.use('/echo', echoRoutes);
app.use('/process', processRoutes);
app.use('/intensive', intensiveRoutes);
app.use('/io', ioRoutes);
app.use('/delay', delayRoutes);
app.use('/memory', memoryRoutes);
app.use('/stream', streamRoutes);
app.use('/error', errorRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});

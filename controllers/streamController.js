const fs = require('fs');
const path = require('path');

// Ruta del archivo grande a transmitir
const filePath = path.join(__dirname, '../data/large-file.txt');

// Función para crear un archivo grande de 100MB si no existe
const createLargeFile = () => {
  const largeText = 'A'.repeat(1024 * 1024); // 1MB de datos
  if (!fs.existsSync(filePath)) {
    // Solo creamos el archivo si no existe
    fs.writeFile(filePath, largeText.repeat(100), (err) => {  // Crea un archivo de 100MB
      if (err) throw err;
      console.log('Archivo grande creado');
    });
  }
};

// Controlador para manejar la transmisión de datos grandes
const handleStreamData = (req, res) => {
  // Verifica si el archivo existe, si no, lo crea
  createLargeFile();

  // Configurar la cabecera para indicar que es un stream de datos
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');  // Indicar que vamos a enviar los datos en fragmentos

  // Iniciar un flujo de lectura del archivo (simulando una gran transmisión de datos)
  const fileStream = fs.createReadStream(filePath);

  // Enviar los datos en fragmentos (chunks)
  fileStream.pipe(res);

  // Log de cuando comienza a enviarse el archivo
  fileStream.on('open', () => {
    console.log('Comenzando a transmitir datos grandes...');
  });

  // Manejar errores en la transmisión
  fileStream.on('error', (err) => {
    console.error('Error en la transmisión del archivo:', err);
    res.status(500).json({ error: 'Hubo un problema al transmitir el archivo' });
  });

  // Confirmar cuando la transmisión se haya completado
  fileStream.on('end', () => {
    console.log('Transmisión de datos completada.');
  });
};

module.exports = { handleStreamData };

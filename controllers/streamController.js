const fs = require('fs');
const path = require('path');

// Ruta base del archivo grande a transmitir
const baseFilePath = path.join(__dirname, '../data/large-file');
const dirPath = path.dirname(baseFilePath);  // Ruta del directorio

// Función para generar un nombre único para el archivo
const generateUniqueFileName = () => {
  let counter = 0;
  let filePath = `${baseFilePath}.txt`;

  // Verifica si el archivo existe y genera un nombre único
  while (fs.existsSync(filePath)) {
    counter++;
    filePath = `${baseFilePath}-${counter}.txt`;  // Nuevo nombre con sufijo numérico
  }

  return filePath;
};

// Función para crear el archivo grande de 10MB si no existe
const createLargeFile = () => {
  const largeText = 'A'.repeat(1024 * 1024); // 1MB de datos

  // Crear el directorio si no existe
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });  // Crea el directorio si no existe
    console.log('Directorio creado:', dirPath);
  }

  // Generar el nombre único para el archivo
  const filePath = generateUniqueFileName();

  // Crear el archivo de 10MB
  fs.writeFile(filePath, largeText.repeat(10), (err) => {  // Crea un archivo de 10MB
    if (err) throw err;
    console.log(`Archivo grande de 10MB creado: ${filePath}`);
  });
};

// Controlador para manejar la transmisión de datos grandes
const handleStreamData = (req, res) => {
  // Verifica si el archivo existe, si no, lo crea
  createLargeFile();

  // Configurar la cabecera para indicar que es un stream de datos
  res.setHeader('Content-Type', 'text/plain');
  res.setHeader('Transfer-Encoding', 'chunked');  // Indicar que vamos a enviar los datos en fragmentos

  // Iniciar un flujo de lectura del archivo (simulando una gran transmisión de datos)
  const filePath = generateUniqueFileName();  // Generar nombre único para el archivo
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

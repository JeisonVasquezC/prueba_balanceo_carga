const fs = require('fs');
const path = require('path');

// Ruta del archivo temporal para simular E/S
const filePath = path.join(__dirname, '../data/tempData.txt');
const dirPath = path.dirname(filePath);  // Ruta del directorio

// Función para agregar datos al final del archivo
const appendToFile = (data) => {
  return new Promise((resolve, reject) => {
    const dataToWrite = `${new Date().toISOString()} - ${data}\n`; // Formatear los datos con timestamp

    console.log('Iniciando la escritura en el archivo...'); // Log de inicio de la escritura

    // Asegurarse de que el directorio exista, si no, crear el directorio
    if (!fs.existsSync(dirPath)) {
      console.log(`El directorio ${dirPath} no existe. Creando el directorio...`); // Log de directorio no existe
      fs.mkdirSync(dirPath, { recursive: true });  // Crea el directorio si no existe
      console.log('Directorio creado:', dirPath);
    }

    fs.appendFile(filePath, dataToWrite, 'utf8', (err) => {
      if (err) {
        console.error('Error al escribir en el archivo:', err); // Log de error en la escritura
        return reject('Error al escribir en el archivo');
      }
      console.log('Escritura completada en el archivo.'); // Log de éxito en la escritura
      resolve('Escritura completada');
    });
  });
};

// Función para leer datos del archivo
const readFromFile = () => {
  return new Promise((resolve, reject) => {
    console.log('Iniciando la lectura del archivo...'); // Log de inicio de la lectura

    // Verificar si el archivo existe antes de leerlo
    if (!fs.existsSync(filePath)) {
      console.log(`El archivo ${filePath} no existe. Creando el archivo vacío...`);  // Log si el archivo no existe

      // Asegurarse de que el directorio exista, si no, crear el directorio
      if (!fs.existsSync(dirPath)) {
        console.log(`El directorio ${dirPath} no existe. Creando el directorio...`);
        fs.mkdirSync(dirPath, { recursive: true });
        console.log('Directorio creado:', dirPath);
      }

      fs.writeFileSync(filePath, '', 'utf8'); // Crea el archivo vacío si no existe
      console.log(`Archivo ${filePath} creado exitosamente.`);
    }

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        console.error('Error al leer el archivo:', err); // Log de error en la lectura
        return reject('Error al leer el archivo');
      }
      console.log('Lectura completada del archivo.'); // Log de éxito en la lectura
      resolve(data);
    });
  });
};

// Controlador para manejar la lógica de /io
const handleIO = async (req, res) => {
  const { action, data } = req.body; // Obtener la acción (leer o escribir) y los datos

  console.log(`Acción recibida: ${action}`); // Log de acción recibida

  if (!action || (action !== 'read' && action !== 'write')) {
    console.log('Acción no válida o faltante'); // Log de error si la acción es inválida
    return res.status(400).json({ error: 'Acción no válida. Use "read" o "write".' });
  }

  try {
    if (action === 'write' && data) {
      // Si la acción es escribir, se recibe un dato y se escribe en el archivo
      console.log(`Escribiendo los siguientes datos en el archivo: ${data}`); // Log de los datos a escribir
      await appendToFile(data);
      res.json({ status: 'operation complete', action: 'write' });
    } else if (action === 'read') {
      // Si la acción es leer, se lee el contenido del archivo
      const fileData = await readFromFile();
      console.log(`Datos leídos del archivo: ${fileData}`); // Log de los datos leídos
      res.json({ status: 'operation complete', action: 'read', data: fileData });
    } else {
      console.log('Acción "write" requiere datos'); // Log de error si falta un dato en "write"
      res.status(400).json({ error: 'Para la acción "write" se requiere un dato.' });
    }
  } catch (error) {
    console.error('Error al manejar la solicitud:', error); // Log de error general
    res.status(500).json({ error: error.message });
  }
};

module.exports = { handleIO };

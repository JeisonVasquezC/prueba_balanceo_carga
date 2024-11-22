// Controlador para manejar la lógica de /process
const handleProcess = (req, res) => {
    const { numbers } = req.body; // Obtener el arreglo de números del cuerpo de la solicitud
  
    // Validar que se envió un arreglo de números
    if (!Array.isArray(numbers)) {
      return res.status(400).json({ error: 'El campo "numbers" debe ser un arreglo de números.' });
    }
  
    // Calcular la suma de los números
    const sum = numbers.reduce((acc, num) => {
      if (typeof num !== 'number') {
        throw new Error('El arreglo debe contener solo números.');
      }
      return acc + num;
    }, 0);
  
    // Devolver el resultado
    res.json({ sum });
  };
  
  module.exports = { handleProcess };
  
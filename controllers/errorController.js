// Controlador para manejar errores intencionales
const intentionalError = (req, res) => {
    const { type } = req.query; // Leer el tipo de error desde la query string
    
    // Generar el error basado en el tipo proporcionado
    if (type === '500') {
      res.status(500).json({ error: 'Intentional error for testing - Internal Server Error' });
    } else if (type === '400') {
      res.status(400).json({ error: 'Intentional error for testing - Bad Request' });
    } else {
      // Si no se especifica un tipo válido, devolver un error predeterminado
      res.status(400).json({ error: 'Invalid error type. Use ?type=500 or ?type=400' });
    }
  };
  
  module.exports = { intentionalError };
  
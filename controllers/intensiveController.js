// Función recursiva para calcular Fibonacci (ineficiente para grandes números)
const fibonacci = (n) => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };
  
  // Controlador para manejar la lógica de /intensive
  const handleIntensive = (req, res) => {
    const { number } = req.query; // Obtener el número de la solicitud (como parámetro de consulta)
  
    if (!number || isNaN(number) || number < 0) {
      return res.status(400).json({ error: 'Por favor, proporcione un número válido en el parámetro "number".' });
    }
  
    const num = parseInt(number);
  
    // Realizar el cálculo intensivo
    try {
      const result = fibonacci(num); // Calculamos el número de Fibonacci
      res.json({ number: num, fibonacci: result });
    } catch (error) {
      res.status(500).json({ error: 'Hubo un error al procesar la solicitud.' });
    }
  };
  
  module.exports = { handleIntensive };
  
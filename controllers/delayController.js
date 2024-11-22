// Función para simular el retraso con tiempo aleatorio
const simulateDelay = () => {
    // Genera un valor aleatorio entre 0 y 5000 milisegundos
    return Math.floor(Math.random() * 5001);  // (0 a 5000 ms)
  };
  
  // Controlador para manejar el retraso
  const handleDelay = (req, res) => {
    // Genera el retraso aleatorio
    const delayTime = simulateDelay();
  
    console.log(`Retraso simulado: ${delayTime} milisegundos`); // Log del retraso generado
    
    // Simula un retraso en la respuesta
    setTimeout(() => {
      res.json({ 
        status: 'success', 
        message: `Respuesta después de ${delayTime} milisegundos de retraso` 
      });
    }, delayTime); // Retraso dinámico en la respuesta
  };
  
  module.exports = { handleDelay };
  
// Controlador para manejar la lógica de /echo
const handleEcho = (req, res) => {
    const data = req.body; // Obtener datos del cuerpo de la solicitud
    res.json({ received: data }); // Devolver los datos recibidos
  };
  
  module.exports = { handleEcho };
  
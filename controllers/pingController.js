// Controlador para manejar la lógica de /ping
const handlePing = (req, res) => {
    res.json({ message: 'pong' });
  };
  
  module.exports = { handlePing };
  
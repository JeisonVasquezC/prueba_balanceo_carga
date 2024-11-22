// Controlador para simular carga de memoria
const handleMemoryLoad = (req, res) => {
    // Simulamos un incremento del uso de memoria creando un arreglo grande
    const memorySize = 100 * 1024 * 1024;  // 100MB en bytes
    let largeArray = new Array(memorySize / 8);  // Crear un arreglo de 100MB (8 bytes por elemento)
  
    console.log('Memoria asignada: 100MB');
    
    // Simulamos un proceso que mantiene la memoria asignada por un momento
    setTimeout(() => {
      // Liberamos la memoria, asignando un valor vacío a la variable
      largeArray = null;
      console.log('Memoria liberada');
      
      // Respondemos con la cantidad de memoria asignada
      res.json({ allocated: '100MB' });
    }, 2000);  // Esperamos 2 segundos antes de liberar la memoria
  };
  
  module.exports = { handleMemoryLoad };
  
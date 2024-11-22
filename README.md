## Instala las dependencias

Ejecuta este comando en el directorio raíz del proyecto para instalar las dependencias listadas en el `package.json`:

```bash
    npm install
```


# Endpoints de la API

## GET: /ping
- **Escenario:** Tráfico ligero
- **Descripción:** Responde con un mensaje simple (como pong). Es útil para validar la conectividad básica
- **Carga:** Muy baja
- **Ejemplo de respuesta:** 
```json
{ 
    "message": "pong" 
}
```

## POST: /echo
- **Escenario:** Prueba la capacidad de devolver datos enviados por el cliente
- **Descripción:** Devuelve los datos recibidos en el cuerpo de la solicitud
- **Carga:** Baja, depende del tamaño de los datos enviados
- **Request body:**
```json
{
    "key": "value"
}
```
- **Ejemplo de respuesta:**
```json
{
    "received": {
        "key": "value"
    }
}
```
**Nota:** Puede enviar un request de diferentes tamaños para obtener diferentes tiempos de respuesta

## POST: /process
- **Escenario:** Simula un procesamiento básico
- **Descripción:** Realiza cálculos matemáticos simples o manipulación de cadenas
- **Carga:** Moderada
- **Ejemplo:** Generar números aleatorios, calcular sumas de arrays, etc.
- **Request body:**
```json
{
    "numbers": [1, 2, 3, 4, 5]
}
```

## GET: /intensive
- **Escenario:** Tráfico pesado
- **Descripción:** Realiza un procesamiento intensivo, como calcular una secuencia de Fibonacci para un número grande, lo cual es útil para simular una carga computacional pesada
- **Carga:** Alta, útil para probar cómo el balanceador maneja CPU-bound tasks
- **Parámetros:** `number` (ejemplo: /intensive?number=30)
- **Ejemplo de respuesta:**
```json
{
    "number": 30,
    "fibonacci": 832040
}
```

## POST: /io
- **Escenario:** Simula operaciones que dependen de entrada/salida
- **Descripción:** Simula operaciones de entrada y salida (E/S) con archivos, lee o escribe datos en un archivo en el servidor
- **Carga:** Moderada a alta dependiendo del tamaño de los datos
- **Request body (escribir):**
```json
{
    "action": "write",
    "data": "Este es un texto de prueba para escribir en el archivo."
}
```
- **Request body (leer):**
```json
{
    "action": "read"
}
```
- **Ejemplo de respuesta:**
```json
{
    "status": "operation complete"
}
```

## GET: /delay
- **Escenario:** Simula retrasos en la respuesta del servidor
- **Descripción:** Responde después de un período específico, este periodo es un número aleatorio entre 0 y 5 segundos
- **Carga:** Baja, pero introduce latencia controlada
- **Ejemplo:** Si time=5000, responde en 5 segundos

## GET: /memory
- **Escenario:** Simula un incremento del uso de memoria
- **Descripción:** Crea una estructura en memoria (como un array grande correspondiente a 100MB) y luego lo libera
- **Carga:** Alta, útil para ver cómo el balanceador maneja Memory-bound tasks
- **Ejemplo de respuesta:**
```json
{
    "allocated": "100MB"
}
```

## GET: /stream
- **Escenario:** Simula la transmisión de datos grandes
- **Descripción:** Genera un archivo de tamaño de 100MB y lo retorna
- **Carga:** Alta
- **Ejemplo de respuesta:** Una cadena de texto larga

## GET: /error
- **Escenario:** Verifica cómo el balanceador maneja respuestas de error
- **Descripción:** Devuelve un error 500 o 400 intencionalmente
- **Carga:** Baja
- **Parámetros:** `type` (ejemplos: /error?type=500, /error?type=400)
- **Ejemplo de respuesta:**
```json
{
    "error": "Intentional error for testing"
}
```

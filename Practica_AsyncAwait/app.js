// Aquí tienes un código incompleto para tomar como base. Cada función está definida, pero los pasos cruciales aún no están implementados.

// Simulando una base de datos de mesas
const mesasDisponibles = Math.floor(Math.random() * 5) + 1;  // Número de mesas disponibles para reservar
console.log(mesasDisponibles);

// Función que simula la verificación de disponibilidad de mesas
function verificarDisponibilidad(mesasSolicitadas) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Completa la lógica aquí: Si hay suficientes mesas disponibles, resuelve la promesa, 
      if (mesasSolicitadas <= mesasDisponibles) resolve();

      // de lo contrario, recházala con un mensaje adecuado.
      else reject ('No hay suficientes mesas disponibles');

    }, 2000);  // Simula un retraso en la verificación (2 segundos)
  });
}

// Función que simula el envío de un correo de confirmación
function enviarConfirmacionReserva(nombreCliente) {
  
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      // Completa la lógica aquí: Simula un envío de correo. Usa Math.random() 
      // para simular si el correo se envió correctamente o si ocurrió un error.
      const correoSim = `${nombreCliente.replaceAll(' ','').toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g,"")}@example.com`; //replace(/[\u0300-\u036f]/g,"") para eliminar tildes
      const randomNum = Math.round(Math.random());
      
      if (randomNum === 1) resolve(correoSim);
      
      else reject(`Error al enviar correo de confirmación a ${correoSim}`);

    }, 1500);  // Simula el envío de un correo (1.5 segundos)
  });
}

// Función principal para manejar una reserva
async function hacerReserva(nombreCliente, mesasSolicitadas) {
  try {
    console.log("Verificando disponibilidad de mesas...");
    
    const disponibilidad = await verificarDisponibilidad(mesasSolicitadas); // Llama a la función de verificación
    
    console.log(`Reservado: 
      Nombre: ${nombreCliente}
      Mesas: ${mesasSolicitadas}`);  
    
    // Completa el flujo aquí: Si hay mesas disponibles, llama a la función para enviar la confirmación.
    await enviarConfirmacionReserva(nombreCliente)
    .then(email => console.log(`Correo de confirmación enviado exitosamente a ${email}`));
    
    // Si no hay mesas disponibles o si ocurre un error, captura el error.
  } catch (error) {
    console.log("Error:", error);  // Maneja los errores en la promesa
  }
}

// Llamada de prueba
hacerReserva("Juan Pérez", 3);  // Intenta hacer una reserva para 3 personas
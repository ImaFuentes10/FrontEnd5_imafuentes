document.getElementById('registroEvento').addEventListener('submit', function(event) {
    event.preventDefault(); // Evita el envío automático del formulario

    // Variables
    const nombre = document.getElementById('nombre').value;
    const correo = document.getElementById('correo').value;
    const telefono = document.getElementById('telefono').value;
    const intereses = document.querySelectorAll('input[name="intereses"]:checked');
    const horario = document.querySelector('input[name="horario"]:checked');
    const fecha = document.getElementById('fecha').value;
    const hora = document.getElementById('hora').value;

    console.log(fecha);
    console.log(hora);
    
    
    // Validaciones básicas
        
    if (!nombre || !correo || !telefono) {
      alert('Por favor, completa todos los campos obligatorios.');
      return;
    }

    if (!isNaN(Number(nombre))) return alert ('Ingresa un nombre válido')
    
    if (telefono.length < 10 || telefono.length > 10) return alert ('Ingresa un teléfono de 10 dígitos');
    
    if (intereses.length < 1) return alert ('Selecciona al menos un interés');

    if (!fecha) return alert ('Selecciona una fecha preferida')
    
    if (fecha) {
        const today = new Date();
        const date = new Date(fecha); 
        
        if (date <= today){
            return alert ('Selecciona una fecha válida')
        };
    }
        
    if (!hora) return alert ('Selecciona un horario preferido')

    // Si todo está bien
    alert('Registro exitoso. ¡Gracias por registrarte!');
  });

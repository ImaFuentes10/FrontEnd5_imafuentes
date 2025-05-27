// Importamos Zod
import { z } from 'https://cdn.jsdelivr.net/npm/zod@3.22.4/+esm'

const form = document.querySelector('#registerForm');
const errorOutput = document.querySelector('#errors');

// Esquema para validar los datos del formulario
const registerSchema = z.object({
  // PISTA: Define que el nombre debe ser una cadena no vacía.
  name: z.string().min(1, "Ingresa un nombre"),

  // PISTA: Valida que el correo tenga el formato correcto.
  email: z.string().email("Correo electrónico inválido"),

  // PISTA: La contraseña debe tener al menos 6 caracteres.
  password: z.string().min(6, "La contraseña debe contener al menos 6 caracteres")
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  
  // Capturamos los valores ingresados
  const formData = {
    name: document.getElementById("name").value,
    email: document.getElementById("email").value,
    password: document.getElementById("password").value,
  };

  try {
    // PISTA: Usa el método correcto de Zod para validar el esquema.
    registerSchema.parse(formData);
    //registerSchema.___?___(formData);
    
    alert("¡Registro exitoso!");

    form.reset();

    errorOutput.textContent = '';

  } catch (error) {
    // PISTA: Muestra los mensajes de error en la página.
    errorOutput.textContent = error.errors.map(e => e.message).join(", ");
  }
});

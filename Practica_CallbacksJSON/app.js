// Datos iniciales de libros en formato JSON
let biblioteca = {
    "libros": [
        { "titulo": "Cien años de soledad", "autor": "Gabriel García Márquez", "genero": "Realismo mágico", "disponible": true },
        { "titulo": "1984", "autor": "George Orwell", "genero": "Distopía", "disponible": true }
    ]
};


/* Funcion delay para similar retrasos en cada operacion */
function delay(){
    return new Promise(resolve => setTimeout(resolve, 1000));
}


// Función para simular la lectura de datos (asimilar la lectura de un archivo JSON)
async function leerDatos(callback) {
    await delay();
        // Aquí simulas leer el JSON con un retraso de 1 segundo
    callback(biblioteca);
}


// Función para mostrar todos los libros en consola
function mostrarLibros() {
    leerDatos((datos) => {
        console.log("Inventario de libros:");
        datos.libros.forEach((libro, index) => {
            console.log(`${index + 1}. ${libro.titulo} - ${libro.autor} (${libro.disponible ? 'Disponible' : 'Prestado'})`);
        });
    });
}

// Función para agregar un nuevo libro
async function agregarLibro(titulo, autor, genero, disponible, callback) {
    const nuevoLibro = { titulo, autor, genero, disponible };
    // Aquí falta la simulación de escribir el libro en el "archivo" (es decir, agregarlo al objeto)
    await delay();
        // Pista: deberías agregar el nuevo libro a `biblioteca.libros`
    biblioteca.libros.push(nuevoLibro);
    
    callback(biblioteca);
     
}

// Función para cambiar la disponibilidad de un libro
async function actualizarDisponibilidad(titulo, nuevoEstado, callback) {
    // Simula un retraso antes de actualizar la disponibilidad
    await delay();
        // Pista: busca el libro por título y cambia la propiedad 'disponible' a nuevoEstado
    biblioteca.libros.forEach((libro) => {
        if(libro.titulo === titulo) 
            libro.disponible = nuevoEstado;
    });
    
    callback(biblioteca);
}


/* Función que simula actualizar JSON */
function updateJSON(biblioteca){
    const JSONBiblioteca = JSON.stringify(biblioteca);

    return JSONBiblioteca
}

// Ejemplo de cómo ejecutar la aplicación
mostrarLibros();
agregarLibro("El principito", "Antoine de Saint-Exupéry", "Fábula", true, updateJSON);
mostrarLibros();
actualizarDisponibilidad("1984", false, updateJSON);
mostrarLibros();

/* console.log del JSON para mostrar que se actualizó
    se simula el tiempo de retraso para dar tiempo a las operaciones anteriores */
setTimeout(() => {
    console.log(updateJSON(biblioteca));
},5000);



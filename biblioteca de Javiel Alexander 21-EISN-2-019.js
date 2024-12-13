//JAVIEL ALEXANDER HIDALGO 21-EISN-2-019

const readline = require('readline');

// Clase Autor
class Autor {
  constructor(nombre, nacionalidad) {
    this.nombre = nombre;
    this.nacionalidad = nacionalidad;
  }

  informacion() {
    return `${this.nombre} (${this.nacionalidad})`;
  }
}

// Clase Libro
class Libro {
  constructor(titulo, autor, anio) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
    this.disponibilidad = true; 
  }

  informacion() {
    return `${this.titulo} - ${this.autor.informacion()} (${this.anio}) - ${this.disponibilidad ? "Disponible" : "No disponible"}`;
  }

  prestar() {
    this.disponibilidad = false;
  }

  devolver() {
    this.disponibilidad = true;
  }
}

// Clase Biblioteca
class Biblioteca {
  constructor() {
    this.libros = [];
  }

  agregarLibro(libro) {
    this.libros.push(libro);
  }

  listarLibros() {
    this.libros.forEach((libro, index) => {
      console.log(`${index + 1}. ${libro.informacion()}`);
    });
  }

  buscarPorTitulo(titulo) {
    return this.libros.filter(libro => libro.titulo.toLowerCase().includes(titulo.toLowerCase()));
  }

  buscarPorAutor(nombreAutor) {
    return this.libros.filter(libro => libro.autor.nombre.toLowerCase().includes(nombreAutor.toLowerCase()));
  }

  librosDisponibles() {
    return this.libros.filter(libro => libro.disponibilidad);
  }
}

// Instanciar la biblioteca
const biblioteca = new Biblioteca();

// Cree algunos libros y agregarlos
biblioteca.agregarLibro(new Libro("Cuentos Escritos en el Exilio", new Autor("Juan Bosch", "Dominicana"), 1962));
biblioteca.agregarLibro(new Libro("La Mañosa", new Autor("Juan Bosch", "Dominicana"), 1936));
biblioteca.agregarLibro(new Libro("Poema en veinte surcos", new Autor("Julia de Burgos", "Dominicana"), 1938));
biblioteca.agregarLibro(new Libro("El Hijo de la Lluvia", new Autor("Alicia L. Rodríguez", "Dominicana"), 2015));
biblioteca.agregarLibro(new Libro("La Fiesta del Chivo", new Autor("Mario Vargas Llosa", "Peruana-Dominicana"), 2000));

// Configuración para leer desde la consola
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

// Función para mostrar el menú y manejar las elecciones
function mostrarMenu() {
  console.log("\n--- Biblioteca Dominicana ---");
  biblioteca.listarLibros();
  
  rl.question("\nSelecciona un libro por número para ver más detalles: ", (respuesta) => {
    const index = parseInt(respuesta) - 1;
    if (index >= 0 && index < biblioteca.libros.length) {
      console.log("\nDetalles del libro:");
      console.log(biblioteca.libros[index].informacion());
    } else {
      console.log("Selección no válida. Intenta de nuevo.");
    }
    mostrarMenu();  // Mostrar de nuevo el menú
  });
}

// Iniciar el programa
mostrarMenu();

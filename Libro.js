const Autor = require("./Autor");

// Clase Libro
class Libro {
  constructor(titulo, autor, anio) {
    this.titulo = titulo;
    this.autor = autor;
    this.anio = anio;
    this.disponibilidad = true;
  }

  informacion() {
    return `${this.titulo} - ${this.autor.informacion()} (${this.anio}) - ${
      this.disponibilidad ? "Disponible" : "No disponible"
    }`;
  }

  prestar() {
    this.disponibilidad = false;
  }

  devolver() {
    this.disponibilidad = true;
  }
}




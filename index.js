const express = require('express');
const cors = require('cors');

// Crear la aplicación Express
const app = express();


app.use(cors());
app.use(cors({ origin: 'http://localhost:3008' }));


// Clase Autor
class Autor {
  constructor(nombre, pais) {
    this.nombre = nombre;
    this.pais = pais;
  }

  informacion() {
    return `${this.nombre} (${this.pais})`;
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

  prestar() {
    this.disponibilidad = false;
  }

  devolver() {
    this.disponibilidad = true;
  }

  informacion() {
    return {
      titulo: this.titulo,
      autor: this.autor.informacion(),
      anio: this.anio,
      disponibilidad: this.disponibilidad ? 'Disponible' : 'No Disponible',
    };
  }
}

// Crear instancias de autores y libros
const autores = [
  new Autor('Gabriel García Márquez', 'Colombia'),
  new Autor('Isabel Allende', 'Chile'),
  new Autor('Mario Vargas Llosa', 'Perú'),
  new Autor('J.K. Rowling', 'Reino Unido'),
  new Autor('George Orwell', 'Reino Unido'),
  new Autor('Julio Cortázar', 'Argentina'),
  new Autor('Carlos Fuentes', 'México'),
  new Autor('Franz Kafka', 'República Checa'),
  new Autor('Homer', 'Grecia'),
  new Autor('Virginia Woolf', 'Reino Unido')
];

const libros = [
  new Libro('Cien años de soledad', autores[0], 1967),
  new Libro('La casa de los espíritus', autores[1], 1982),
  new Libro('La ciudad y los perros', autores[2], 1963),
  new Libro('Harry Potter y la piedra filosofal', autores[3], 1997),
  new Libro('1984', autores[4], 1949),
  new Libro('Rayuela', autores[5], 1963),
  new Libro('La muerte de Artemio Cruz', autores[6], 1962),
  new Libro('La metamorfosis', autores[7], 1915),
  new Libro('La Ilíada', autores[8], -800),
  new Libro('Mrs. Dalloway', autores[9], 1925),
];

// Crear la API con Express
app.use(express.json());

// Endpoints
app.get('/', (req, res) => {
  res.send('API de Biblioteca');
});

// Listar todos los libros
app.get('/libros', (req, res) => {
  res.json(libros.map(libro => libro.informacion()));
});

// Listar libros disponibles
app.get('/libros/disponibles', (req, res) => {
  const disponibles = libros.filter(libro => libro.disponibilidad);
  res.json(disponibles.map(libro => libro.informacion()));
});

// Buscar libros por título
app.get('/libros/titulo/:titulo', (req, res) => {
  const { titulo } = req.params;
  const librosEncontrados = libros.filter(libro =>
    libro.titulo.toLowerCase().includes(titulo.toLowerCase())
  );
  if (librosEncontrados.length > 0) {
    res.json(librosEncontrados.map(libro => libro.informacion()));
  } else {
    res.status(404).send('No se encontraron libros con ese título.');
  }
});

// Buscar libros por autor
app.get('/libros/autor/:autor', (req, res) => {
  const { autor } = req.params;
  const librosPorAutor = libros.filter(libro =>
    libro.autor.nombre.toLowerCase().includes(autor.toLowerCase())
  );
  if (librosPorAutor.length > 0) {
    res.json(librosPorAutor.map(libro => libro.informacion()));
  } else {
    res.status(404).send('No se encontraron libros para ese autor.');
  }
});

// Prestar un libro
app.post('/libros/prestar/:id', (req, res) => {
  const { id } = req.params;
  const libro = libros[id - 1];
  if (libro) {
    libro.prestar();
    res.send(`El libro "${libro.titulo}" fue prestado.`);
  } else {
    res.status(404).send('Libro no encontrado.');
  }
});

// Devolver un libro
app.post('/libros/devolver/:id', (req, res) => {
  const { id } = req.params;
  const libro = libros[id - 1];
  if (libro) {
    libro.devolver();
    res.send(`El libro "${libro.titulo}" fue devuelto.`);
  } else {
    res.status(404).send('Libro no encontrado.');
  }
});

// Iniciar el servidor
const PORT = 3008;
app.listen(PORT, () => {
  console.log(`API de Biblioteca corriendo en http://localhost:${PORT}`);
});

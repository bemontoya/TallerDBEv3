//Crear un registro
db.contenidos.insertOne({
  titulo: 'Berserk',
  tipo: 'serie',
  anio_lanzamiento: NumberInt('1997'),
  clasificacion: '+18',
  sinopsis: 'Guts, un solitario mercenario que blande una espada colosal, se une a la Banda del Halcón liderada por el carismático Griffith, forjando un destino marcado por la ambición y la traición.',
  generos: ['Animación', 'Fantasía Oscura', 'Acción', 'Drama'],
  calidad_maxima: '1080p Full HD',
  disponible: true,
  fecha_agregado: ISODate('2026-11-10T00:00:00.000Z'),
  reparto: [
    { actor: 'Nobutoshi Canna', personaje: 'Guts' },
    { actor: 'Toshiyuki Morikawa', personaje: 'Griffith' },
    { actor: 'Yūko Miyamura', personaje: 'Casca' }
  ],
  idiomas: {
    audio: ['Japonés (Original)', 'Español Latino', 'Inglés'],
    subtitulos: ['Español', 'Inglés', 'Portugués']
  },
  temporadas: [
    {
      temporada: NumberInt('1'),
      anio: NumberInt('1997'),
      episodios: [
        {
          num: NumberInt('1'),
          titulo: 'El Caballero Negro',
          duracion_min: NumberInt('25'),
          video_url: 'https://cdn.stream.com/berserk/s01e01.mp4'
        },
        {
          num: NumberInt('2'),
          titulo: 'La Banda del Halcón',
          duracion_min: NumberInt('25'),
          video_url: 'https://cdn.stream.com/berserk/s01e02.mp4'
        },
        {
          num: NumberInt('3'),
          titulo: 'Bautismo de fuego',
          duracion_min: NumberInt('25'),
          video_url: 'https://cdn.stream.com/berserk/s01e03.mp4'
        }
      ]
    }
  ]
});

//buscar una serie con filtros de genero y actor
db.contenidos.find(
  {
    disponible: true,
    generos: 'Fantasía Oscura',
    'reparto.actor': 'Nobutoshi Canna'
  },
  {
    _id: 0,
    titulo: 1,
    anio_lanzamiento: 1,
    calidad_maxima: 1,
    'temporadas.episodios.num': 1,
    'temporadas.episodios.titulo': 1
  }
);


//agregar un capitulo a una serie en especifico
db.contenidos.updateOne(
  {
    titulo: 'Berserk',
    anio_lanzamiento: 1997,
    'temporadas.temporada': 1
  },
  {
    $push: {
      'temporadas.$.episodios': {
        num: NumberInt('4'),
        titulo: 'La mano de Dios',
        duracion_min: NumberInt('25'),
        video_url: 'https://cdn.stream.com/berserk/s01e04.mp4'
      }
    },
    $addToSet: {
      'idiomas.subtitulos': 'Francés'
    }
  }
);


//crear registro de prueba para erliminarlo
db.contenidos.insertOne({
  titulo: 'Berserk - Especial Recopilatorio (Prueba)',
  tipo: 'cortometraje',
  anio_lanzamiento: NumberInt('1997'),
  disponible: false
});

//eliminar registro de prueba
db.contenidos.deleteOne({
  titulo: 'Berserk - Especial Recopilatorio (Prueba)'
});





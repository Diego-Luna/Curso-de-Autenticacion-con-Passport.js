const moviesMock = [
  {
    id: 'a6803b87-1b6c-4006-a86a-fd04f174c499',
    title: 'Of Human Hearts',
    year: 2001,
    cover: 'http://dummyimage.com/132x116.jpg/cc0000/ffffff',
    description:
      'In congue. Etiam justo. Etiam pretium iaculis justo.In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.Nulla ut erat id mauris vulputate elementum. Nullam varius. Nulla facilisi.',
    duration: 1920,
    contentRating: 'NC-17',
    source: 'http://dailymail.co.uk/cubilia/curae.xml',
    tags: [
      'Comedy',
      'Comedy|Drama|Romance',
      'Drama|Mystery|Sci-Fi',
      'Drama|War',
    ],
  },
  {
    id: 'a8892a6b-e2cc-4d9d-b30f-91b610d8eb6b',
    title: 'Perfect Holiday, The',
    year: 2009,
    cover: 'http://dummyimage.com/169x115.png/5fa2dd/ffffff',
    description:
      'Vestibulum ac est lacinia nisi venenatis tristique. Fusce congue, diam id ornare imperdiet, sapien urna pretium nisl, ut volutpat sapien arcu sed augue. Aliquam erat volutpat.In congue. Etiam justo. Etiam pretium iaculis justo.In hac habitasse platea dictumst. Etiam faucibus cursus urna. Ut tellus.',
    duration: 1912,
    contentRating: 'PG-13',
    source:
      'https://phoca.cz/vestibulum/sed/magna/at/nunc/commodo/placerat.json',
    tags: [
      'Crime|Thriller',
      'Horror|Thriller',
      'Fantasy|Horror|Sci-Fi|Thriller',
      'Crime|Drama|Film-Noir',
    ],
  },
  {
    id: '1a41a104-3ac7-45c4-92ae-7a84327c7977',
    title: 'Desert Hearts',
    year: 1999,
    cover: 'http://dummyimage.com/117x128.bmp/ff4444/ffffff',
    description:
      'Nullam sit amet turpis elementum ligula vehicula consequat. Morbi a ipsum. Integer a nibh.In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.',
    duration: 2033,
    contentRating: 'PG-13',
    source: 'http://prlog.org/viverra/diam/vitae.jsp',
    tags: ['Comedy|Romance', 'Drama', 'Drama'],
  },
  {
    id: 'fafb0941-81d0-4e29-a2ca-626f08b7fae1',
    title: 'First Daughter',
    year: 2010,
    cover: 'http://dummyimage.com/208x222.png/dddddd/000000',
    description:
      'Integer tincidunt ante vel ipsum. Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.Praesent blandit. Nam nulla. Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.',
    duration: 2019,
    contentRating: 'R',
    source: 'http://un.org/interdum/mauris/non.xml',
    tags: ['Action|Crime', 'Comedy|Fantasy|Musical|Mystery', 'Comedy|Drama'],
  },
  {
    id: 'a5c663a9-a269-4534-9d27-96f8222836b6',
    title: 'Awfully Big Adventure, An',
    year: 1997,
    cover: 'http://dummyimage.com/221x133.png/cc0000/ffffff',
    description:
      'Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.',
    duration: 1939,
    contentRating: 'PG-13',
    source: 'https://github.io/nullam/varius/nulla/facilisi.json',
    tags: ['Animation'],
  },
  {
    id: '40090f79-9b72-4185-911b-4b346b9ccc7b',
    title: 'Fork in the Road, A',
    year: 2008,
    cover: 'http://dummyimage.com/230x122.jpg/dddddd/000000',
    description:
      'In quis justo. Maecenas rhoncus aliquam lacus. Morbi quis tortor id nulla ultrices aliquet.Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo. Pellentesque viverra pede ac diam. Cras pellentesque volutpat dui.Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.',
    duration: 1953,
    contentRating: 'PG',
    source: 'http://xrea.com/lacus/at/turpis/donec/posuere/metus/vitae.jpg',
    tags: [
      'Comedy',
      'Comedy|Crime|Mystery|Thriller',
      'Comedy|Horror|Sci-Fi',
      'Comedy|Musical',
      'Drama',
    ],
  },
  {
    id: '7cf4f470-c816-413a-96a0-d89ac6f2aaa0',
    title: 'Poolsite',
    year: 1994,
    cover: 'http://dummyimage.com/221x234.bmp/ff4444/ffffff',
    description:
      'Phasellus sit amet erat. Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.',
    duration: 1945,
    contentRating: 'PG-13',
    source: 'http://ihg.com/ultricies/eu.aspx',
    tags: ['Comedy', 'Action|Thriller', 'Drama|Romance', 'Children|Drama'],
  },
  {
    id: 'c066a3a6-6f05-4ecf-9c0a-3b073826ef01',
    title: 'Memories of Underdevelopment (Memorias del subdesarrollo)',
    year: 2005,
    cover: 'http://dummyimage.com/140x222.png/ff4444/ffffff',
    description:
      'Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.',
    duration: 2014,
    contentRating: 'G',
    source: 'https://t-online.de/diam.js',
    tags: ['Drama|War', 'Comedy|Fantasy|Romance', 'Documentary'],
  },
  {
    id: 'd858d08b-c10b-4d28-bac9-c103bfe203cc',
    title: 'Superstar Goofy',
    year: 2011,
    cover: 'http://dummyimage.com/134x152.png/cc0000/ffffff',
    description:
      'In hac habitasse platea dictumst. Morbi vestibulum, velit id pretium iaculis, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Nulla justo.Aliquam quis turpis eget elit sodales scelerisque. Mauris sit amet eros. Suspendisse accumsan tortor quis turpis.Sed ante. Vivamus tortor. Duis mattis egestas metus.',
    duration: 2046,
    contentRating: 'NC-17',
    source: 'http://simplemachines.org/vel.js',
    tags: [
      'Drama',
      'Comedy|Drama',
      'Drama|Thriller',
      'Comedy|Mystery',
      'Action|Animation|Crime|Thriller',
    ],
  },
  {
    id: '5c0ebe52-ca1d-45de-8c3e-42668ac50ad9',
    title: 'Kidnapped For Christ',
    year: 2007,
    cover: 'http://dummyimage.com/168x142.png/ff4444/ffffff',
    description:
      'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.Fusce posuere felis sed lacus. Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem.Sed sagittis. Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci. Nullam molestie nibh in lectus.',
    duration: 1961,
    contentRating: 'PG-13',
    source: 'https://prweb.com/nisl.js',
    tags: ['Thriller', 'Comedy'],
  },
];

function filteredMoviesMock(tag) {
  // nos va a regresar las movies que tengan el tag seleccionado
  // solo va mos a testear las rutas y no los servicios
  return moviesMock.filter(movie => movie.tags.includes(tag));
}
// solo va mos a testear las rutas y no a los servicios
class MoviesServiceMock {
  async getMovies() {
    return Promise.resolve(moviesMock);
  }

  async createMovie() {
    return Promise.resolve(moviesMock[0]);
  }
}

module.exports = {
  moviesMock,
  filteredMoviesMock,
  MoviesServiceMock
};

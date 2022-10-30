const { nanoid } = require('nanoid');
const bookshelf = require('./bookshelf');
const { onlyWhitespace } = require('./helper');

const deleteBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const index = bookshelf.findIndex((b) => b.id === bookId);

  if (index !== -1) {
    bookshelf.splice(index, 1);

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil dihapus',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Buku gagal dihapus. Id tidak ditemukan',
  });

  response.code(404);
  return response;
};

const updateBookByIdHandler = (request, h) => {
  const { bookId } = request.params;
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    reading,
  } = request.payload;

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);

    return response;
  }

  if (name === undefined || name === null || name === '' || onlyWhitespace(name)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku',
    });

    response.code(400);

    return response;
  }

  const index = bookshelf.findIndex((b) => b.id === bookId);
  const finished = readPage === pageCount;

  if (index !== -1) {
    bookshelf[index] = {
      ...bookshelf[index],
      name,
      year,
      author,
      summary,
      publisher,
      pageCount,
      readPage,
      finished,
      reading,
    };

    const response = h.response({
      status: 'success',
      message: 'Buku berhasil diperbarui',
    });

    response.code(200);
    return response;
  }

  const response = h.response({
    status: 'fail',
    message: 'Gagal memperbarui buku. Id tidak ditemukan',
  });

  response.code(404);

  return response;
};

const getBookByIdHandler = (request, h) => {
  const { bookId } = request.params;

  const book = bookshelf.filter((b) => b.id === bookId)[0];

  if (book === undefined) {
    const response = h.response({
      status: 'fail',
      message: 'Buku tidak ditemukan',
    });

    response.code(404);
    return response;
  }

  const response = h.response({
    status: 'success',
    data: {
      book,
    },
  });

  response.code(200);
  return response;
};

const getAllBooksHandler = (request) => {
  const {
    name,
    reading,
    finished,
  } = request.query;

  const filteredBookshelf = [];

  bookshelf.forEach((book) => {
    if ([name, reading, finished].every((value) => value === undefined)) {
      filteredBookshelf.push({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      });
      return;
    }

    const conditions = [];

    if (name) {
      conditions.push(book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if (reading) {
      const isReading = reading === '1';
      conditions.push(book.reading === isReading);
    }

    if (finished) {
      const isFinished = finished === '1';
      conditions.push(book.finished === isFinished);
    }

    if (conditions.every((condition) => condition)) {
      filteredBookshelf.push({
        id: book.id,
        name: book.name,
        publisher: book.publisher,
      });
    }
  });

  return {
    status: 'success',
    data: {
      books: filteredBookshelf,
    },
  };
};

const addBookHandler = (request, h) => {
  const {
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage = { readPage: 1 },
    reading = { reading: false },
  } = request.payload;

  const id = nanoid(16);
  const finished = readPage === pageCount;
  const insertedAt = new Date().toISOString();
  const updatedAt = insertedAt;

  const newBook = {
    id,
    name,
    year,
    author,
    summary,
    publisher,
    pageCount,
    readPage,
    finished,
    reading,
    insertedAt,
    updatedAt,
  };

  if (readPage > pageCount) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
    });

    response.code(400);

    return response;
  }

  if (name === undefined || name === null || name === '' || onlyWhitespace(name)) {
    const response = h.response({
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku',
    });

    response.code(400);

    return response;
  }

  bookshelf.push(newBook);

  const isSuccess = bookshelf.filter((book) => book.id === id).length > 0;

  if (isSuccess) {
    const response = h.response({
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: {
        bookId: id,
      },
    });

    response.code(201);

    return response;
  }

  const response = h.response({
    status: 'error',
    message: 'Buku gagal ditambahkan',
  });

  response.code(500);

  return response;
};

module.exports = {
  addBookHandler,
  getAllBooksHandler,
  getBookByIdHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};

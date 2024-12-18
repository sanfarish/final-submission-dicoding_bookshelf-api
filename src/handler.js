const { nanoid } = require('nanoid')
const books = require('./books')

function sendResponse (h, { code, status, message, data }) {
  const responseBody = { status, message }
  if (data) {
    responseBody.data = data
  }
  const response = h.response(responseBody)
  response.code(code)
  return response
};

const createBook = (request, h) => {
  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  if (!name) {
    return sendResponse(h, {
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
  }
  if (pageCount < readPage) {
    return sendResponse(h, {
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
  }

  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = new Date().toISOString()
  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt }
  if (pageCount === readPage) {
    newBook.finished = true
  } else {
    newBook.finished = false
  }
  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id).length > 0
  if (isSuccess) {
    return sendResponse(h, {
      code: 201,
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id }
    })
  }
}

const getAllBooks = (request, h) => {
  let booksData = books

  const { name, reading, finished } = request.query
  if (name) {
    booksData = booksData.filter((book) => book.name.toLowerCase().includes(name.toLowerCase()))
  }
  if (parseInt(reading) === 0 || parseInt(reading) === 1) {
    const readingData = parseInt(reading) === 1
    booksData = booksData.filter((book) => book.reading === readingData)
  }
  if (parseInt(finished) === 0 || parseInt(finished) === 1) {
    const finishedData = parseInt(finished) === 1
    booksData = booksData.filter((book) => book.finished === finishedData)
  }

  const allBooks = booksData.map((book) => {
    return {
      id: book.id,
      name: book.name,
      publisher: book.publisher
    }
  })

  return {
    status: 'success',
    data: { books: allBooks }
  }
}

const getByIdBook = (request, h) => {
  const { id } = request.params

  const book = books.filter((b) => b.id === id)[0]
  if (!book) {
    return sendResponse(h, {
      code: 404,
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
  }

  return {
    status: 'success',
    data: { book }
  }
}

const updateBook = (request, h) => {
  const { id } = request.params
  const book = books.filter((b) => b.id === id)[0]
  if (!book) {
    return sendResponse(h, {
      code: 404,
      status: 'fail',
      message: 'Gagal memperbarui buku. Id tidak ditemukan'
    })
  }

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  if (!name) {
    return sendResponse(h, {
      code: 400,
      status: 'fail',
      message: 'Gagal memperbarui buku. Mohon isi nama buku'
    })
  }
  if (pageCount < readPage) {
    return sendResponse(h, {
      code: 400,
      status: 'fail',
      message: 'Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount'
    })
  }

  const updatedAt = new Date().toISOString()
  const updatedBook = { name, year, author, summary, publisher, pageCount, readPage, reading, updatedAt }
  const index = books.findIndex(b => b.id === id)
  books[index] = { ...books[index], ...updatedBook }

  const isSuccess = books.filter((book) => book.id === id)[0].updatedAt === updatedAt
  if (isSuccess) {
    return sendResponse(h, {
      code: 200,
      status: 'success',
      message: 'Buku berhasil diperbarui'
    })
  }
}

const removeBook = (request, h) => {
  const { id } = request.params
  const book = books.filter((b) => b.id === id)[0]
  if (!book) {
    return sendResponse(h, {
      code: 404,
      status: 'fail',
      message: 'Buku gagal dihapus. Id tidak ditemukan'
    })
  }

  const index = books.findIndex(b => b.id === id)
  books.splice(index, 1)

  const isSuccess = books.find((book) => book.id === id) !== id
  if (isSuccess) {
    return sendResponse(h, {
      code: 200,
      status: 'success',
      message: 'Buku berhasil dihapus'
    })
  }
}

module.exports = { createBook, getAllBooks, getByIdBook, updateBook, removeBook }

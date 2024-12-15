const { nanoid } = require('nanoid')
const books = require('./books')

function sendResponse (h, { code, status, message, data }) {
  const responseBody = { status, message }
  if (data) responseBody.data = data
  const response = h.response(responseBody)
  response.code(code)
  return response
};

const createBook = (request, h) => {
  if (!request.payload.name) {
    return sendResponse(h, {
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. Mohon isi nama buku'
    })
  };

  if (request.payload.pageCount < request.payload.readPage) {
    return sendResponse(h, {
      code: 400,
      status: 'fail',
      message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount'
    })
  };

  const { name, year, author, summary, publisher, pageCount, readPage, reading } = request.payload
  const id = nanoid(16)
  const insertedAt = new Date().toISOString()
  const updatedAt = new Date().toISOString()

  const newBook = { id, name, year, author, summary, publisher, pageCount, readPage, reading, insertedAt, updatedAt }
  books.push(newBook)

  const isSuccess = books.filter((book) => book.id === id).length > 0
  if (isSuccess) {
    return sendResponse(h, {
      code: 201,
      status: 'success',
      message: 'Buku berhasil ditambahkan',
      data: { bookId: id }
    })
  };

  return sendResponse(h, {
    code: 500,
    status: 'fail',
    message: 'Buku gagal ditambahkan'
  })
}

const getAllBooks = () => ({
  status: 'success',
  data: { books }
})

const getByIdBook = (request, h) => {
  const { id } = request.params

  const book = books.filter((b) => b.id === id)[0]
  if (book) {
    return {
      status: 'success',
      data: { book }
    }
  } else {
    return sendResponse(h, {
      code: 404,
      status: 'fail',
      message: 'Buku tidak ditemukan'
    })
  };
}

module.exports = { createBook, getAllBooks, getByIdBook }

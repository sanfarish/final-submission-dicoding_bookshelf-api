const { createBook, getAllBooks, getByIdBook, updateBook } = require('./handler')

const routes = [
  {
    method: 'POST',
    path: '/books',
    handler: createBook
  },
  {
    method: 'GET',
    path: '/books',
    handler: getAllBooks
  },
  {
    method: 'GET',
    path: '/books/{id}',
    handler: getByIdBook
  },
  {
    method: 'PUT',
    path: '/books/{id}',
    handler: updateBook
  }
]

module.exports = routes

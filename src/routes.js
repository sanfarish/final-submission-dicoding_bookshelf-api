const { createBook, getAllBooks, getByIdBook } = require("./handler");

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: createBook
    },
    {
        method: "GET",
        path: "/books",
        handler: getAllBooks
    },
    {
        method: "GET",
        path: "/books/{id}",
        handler: getByIdBook
    }
];

module.exports = routes;

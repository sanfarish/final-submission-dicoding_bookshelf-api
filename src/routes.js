const { createBook, getAllBooks } = require("./handler");

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
    }
];

module.exports = routes;

const { createBook } = require("./handler");

const routes = [
    {
        method: "POST",
        path: "/books",
        handler: createBook
    }
];

module.exports = routes;

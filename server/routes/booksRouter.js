const { Router } = require("express");
const booksRouter = Router();

const booksController = require("../controllers/booksController.js");

booksRouter.get("/", booksController.allBooksGet);

module.exports = booksRouter;

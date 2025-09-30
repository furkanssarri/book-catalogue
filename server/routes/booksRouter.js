const { Router } = require("express");
const booksRouter = Router();

const booksController = require("../controllers/booksController.js");

booksRouter.get("/", booksController.allBooksGet);
booksRouter.get("/:bookId", booksController.singleBookGet);

module.exports = booksRouter;

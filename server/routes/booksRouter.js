const { Router } = require("express");
const booksController = require("../controllers/booksController.js");
const booksRouter = Router();

booksRouter.get("/", booksController.allBooksGet);

booksRouter.get("/:bookId/edit", booksController.editBookGet);
booksRouter.post("/:bookId/edit", booksController.editBookPost);

booksRouter.get("/:bookId", booksController.singleBookGet);

booksRouter.post("/:bookId/delete", booksController.deleteBookPost);

module.exports = booksRouter;

const { Router } = require("express");
const indexRouter = Router();

const booksController = require("../controllers/booksController.js");
const booksRouter = require("./booksRouter");

indexRouter.get("/", booksController.latestBooksGet);

module.exports = indexRouter;

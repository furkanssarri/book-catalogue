const { Router } = require("express");
const indexRouter = Router();

const booksController = require("../controllers/booksController.js");

indexRouter.get("/", booksController.latestBooksGet);

module.exports = indexRouter;

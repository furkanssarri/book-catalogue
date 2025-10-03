const { Router } = require("express");
const validateBook = require("../validators/bookValidator.js");
const newBookController = require("../controllers/newBookController.js");

const newbookRouter = Router();

newbookRouter.get("/", newBookController.newBookFormGet);
newbookRouter.post("/", validateBook, newBookController.newBookPost);

module.exports = newbookRouter;

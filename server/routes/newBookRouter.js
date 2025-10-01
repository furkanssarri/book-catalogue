const { Router } = require("express");
const newBookController = require("../controllers/newBookController.js");

const newbookRouter = Router();

newbookRouter.get("/", newBookController.newBookFormGet);
newbookRouter.post("/", newBookController.newBookPost);

module.exports = newbookRouter;

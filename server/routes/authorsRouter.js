const { Router } = require("express");
const authorsController = require("../controllers/authorsController.js");

const authorsRouter = Router();

authorsRouter.get("/", authorsController.allAuthorsGet);
authorsRouter.get("/:authorId", authorsController.singleAuthorGet);

module.exports = authorsRouter;

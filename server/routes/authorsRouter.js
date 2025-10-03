const { Router } = require("express");
const authorsController = require("../controllers/authorsController");
const validateAuthor = require("../validators/validateAuthor.js");

const authorsRouter = Router();

// list all authors
authorsRouter.get("/", authorsController.allAuthorsGet);

// new author form + create
authorsRouter.get("/new", authorsController.addNewAuthorGet);
authorsRouter.post("/new", validateAuthor, authorsController.addNewAuthorPost);

// edit author form + update
authorsRouter.get("/:authorId/edit", authorsController.editAuthorGet);
authorsRouter.post(
  "/:authorId",
  validateAuthor,
  authorsController.editAuthorPost,
);

// single author details
authorsRouter.get("/:authorId", authorsController.singleAuthorGet);

// delete author
authorsRouter.post("/:authorId/delete", authorsController.deleteAuthor);

module.exports = authorsRouter;

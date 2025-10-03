const { validationResult } = require("express-validator");
const validateAuthor = require("../validators/validateAuthor.js");
const db = require("./queryDb.js");

exports.allAuthorsGet = async (_req, res) => {
  try {
    const authors = await db.getAllAuthors();
    res.render("pages/authors", { title: "All authors", authors: authors });
  } catch (err) {
    console.error(err);
  }
};

exports.singleAuthorGet = async (req, res) => {
  try {
    const authorId = parseInt(req.params.authorId, 10);
    const author = await db.getSingleAuthor(authorId);
    res.render("pages/authorDetails", {
      title: "Author Details",
      author: author,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.addNewAuthorGet = async (req, res) => {
  try {
    res.render("pages/authorForm", {
      title: "Add New Author",
      method: "POST",
      action: `/authors/new`,
      errors: null,
      old: {},
    });
  } catch (err) {
    console.error(err);
  }
};

exports.addNewAuthorPost = [
  validateAuthor,
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).render("pages/authorForm", {
          title: "Add New Author",
          method: "POST",
          action: "/authors/new",
          errors: errors.mapped(),
          old: req.body,
        });
      }
      const newAuthor = await db.addNewAuthor(req.body);
    } catch (err) {
      console.error(err);
    }
    res.redirect("/authors");
  },
];

exports.editAuthorGet = async (req, res) => {
  try {
    const authorId = parseInt(req.params.authorId, 10);
    const author = await db.getSingleAuthor(authorId);
    res.render("pages/authorForm", {
      title: "Edit Author",
      method: "POST",
      action: `/authors/${req.params.authorId}/edit?_method=PUT`,
      errors: null,
      old: author,
    });
  } catch (err) {
    console.error(err);
  }
};

exports.editAuthorPost = async (req, res) => {
  try {
    const authorId = parseInt(req.params.authorId, 10);
    const { name, country, bio } = req.body;
    const newAuthor = {
      name,
      country,
      bio,
    };
    await db.updateAuthor(authorId, newAuthor);
  } catch (err) {
    console.error(err);
  }
  res.redirect("/authors");
};

exports.deleteAuthor = async (req, res) => {
  try {
    const authorId = parseInt(req.params.authorId, 10);
    const booksByAuthor = await db.getBooksByAuthor(authorId);

    if (booksByAuthor.length > 0) {
      console.error("Cannot delete author with linked books.");
      return res.status(400).redirect("/authors");
    }

    await db.deleteAuthor(authorId);
    res.redirect("/authors");
  } catch (err) {
    console.error("Error deleting author:", err);
    res.status(500).send("Server error deleting author");
  }
};
